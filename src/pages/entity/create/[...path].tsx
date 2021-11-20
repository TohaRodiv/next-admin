import { EntityCreate } from "#components/app/entity-view/create";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TControllerPaths, TRelations, TSchemaEntity } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";

type TProps = {
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
	relations: TRelations
}

type TSProps = {
	props: TProps
}

const EntityPageViews: NextPage<TProps> = ({ schema, controllerPath, CRUDSchema, relations, }): JSX.Element => {

	return (
		<>
			<Head>
				<title>Создать новый экземпляр сущности</title>
			</Head>
			<Container>
				<EntityCreate
					schema={schema}
					controllerPath={controllerPath}
					CRUDSchema={CRUDSchema}
					relations={relations} />
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		schema: null,
		controllerPath: null,
		CRUDSchema: null,
		relations: null,
	};

	const paths = context.query["path"] as string[];

	if (Array.isArray(paths)) {
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.controllerPath = controllerPath;
		props.schema = await SwaggerParseService.getCreateOneSchema(controllerPath);
		props.CRUDSchema = await SwaggerParseService.getSchemaCRUD();
		props.relations = await SwaggerParseService.getRelations(props.schema);
	}

	return {
		props: props,
	};
}

export default EntityPageViews;