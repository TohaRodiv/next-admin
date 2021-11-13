import { EntityCreate } from "#components/app/entity-view/create";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TControllerPaths, TSchemaEntity } from "#services/swagger-parse/types";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";

type TProps = {
	schema: TSchemaEntity
	entityId: string
	controllerPath: TControllerPaths
}

type TSProps = {
	props: TProps
}

const EntityPageViews: NextPage<TProps> = ({ entityId, schema, controllerPath, }): JSX.Element => {

	return (
		<>
			<Head>
				<title>Создать новый экземпляр сущности</title>
			</Head>
			<Container>
				<EntityCreate schema={schema} controllerPath={controllerPath} />
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		schema: null,
		entityId: null,
		controllerPath: null,
	};

	const paths = context.query["path"] as string[];

	if (Array.isArray(paths)) {
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.controllerPath = controllerPath;
		props.schema = await SwaggerParseService.getCreateOneSchema(controllerPath);
	}

	return {
		props: props,
	};
}

export default EntityPageViews;