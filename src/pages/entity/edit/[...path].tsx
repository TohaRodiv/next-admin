import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { EntityEdit } from "#components/app/entity-view/edit/EntityEdit";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TControllerPaths, TEntity, TSchemaEntity } from "#services/swagger-parse/types";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";

type TProps = {
	entity: TEntity
	schema: TSchemaEntity
	controllerPath: TControllerPaths
}

type TSProps = {
	props: TProps
}

const EntityPageViews: NextPage<TProps> = ({
	entity, schema, controllerPath
}) => {

	return (
		<>
			<Head>
				<title>Редактор сущности</title>
			</Head>
			<Container>
				<EntityEdit schema={schema} entity={entity} controllerPath={controllerPath} />
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		entity: null,
		schema: null,
		controllerPath: null,
	};

	const paths = context.query["path"] as string[];
	const entityId = +paths.pop();
	
	if (isFinite(entityId)) {
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.controllerPath = controllerPath;
		props.schema = await SwaggerParseService.getUpdateOneSchema(controllerPath);
		const responseEntity = await APIFrontendService.getById(controllerPath, entityId);
		props.entity = await responseEntity.json();
	}

	return {
		props: props,
	};
}

export default EntityPageViews;