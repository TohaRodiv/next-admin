import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TControllerPaths, TEntity, TRelations, TSchemaEntity } from "#services/swagger-parse/types";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { DataEdit } from "#components/pages/data-view/edit";

type TProps = {
	entity: TEntity
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
	relations: TRelations
}

type TSProps = {
	props: TProps
}

const EntityPageViews: NextPage<TProps> = ({
	entity, schema, controllerPath, CRUDSchema, relations,
}) => {

	return (
		<>
			<Head>
				<title>Редактор сущности</title>
			</Head>
			<Container>
				<DataEdit
					schema={schema}
					entity={entity}
					controllerPath={controllerPath}
					CRUDSchema={CRUDSchema}
					relations={relations} />
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		entity: null,
		schema: null,
		controllerPath: null,
		CRUDSchema: null,
		relations: null,
	};

	const paths = context.query["path"] as string[];
	const entityId = +paths.pop();
	
	if (isFinite(entityId)) {
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.controllerPath = controllerPath;
		props.schema = await SwaggerParseService.getUpdateOneSchema(controllerPath);
		const responseEntity = await APIFrontendService.getById(controllerPath, entityId);
		props.entity = await responseEntity.json();
		props.CRUDSchema = await SwaggerParseService.getSchemaCRUD();
		props.relations = await SwaggerParseService.getRelations(props.schema);
	}

	return {
		props: props,
	};
}

export default EntityPageViews;