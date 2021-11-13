import { EntityView } from "#components/app/entity-view/view";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TAvailableCRUDPaths, TControllerPaths, TEntity, TSchemaEntity } from "#services/swagger-parse/types";
import { NextPageContext } from "next";
import Head from "next/head";
import { EffectCallback, useEffect } from "react";
import { Container } from "react-grid-system";

type TProps = {
	entity: TEntity
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	availableCRUDPaths: TAvailableCRUDPaths
}

type TSProps = {
	props: TProps,
}

const EntityPageView: React.FC<TProps> = ({ entity, schema, controllerPath, availableCRUDPaths, }): JSX.Element => {

	return (
		<>
			<Head>
				<title>Просмотр сущности</title>
			</Head>
			<Container>
				<EntityView
					schema={schema}
					entity={entity}
					controllerPath={controllerPath}
					availableCRUD={SwaggerParseService.getAvailableCRUD(availableCRUDPaths)} />
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		entity: null,
		schema: null,
		controllerPath: null,
		availableCRUDPaths: null,
	};

	const paths = context.query["path"] as string[];
	const entityId = +paths.pop();

	if (isFinite(entityId)) {
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.controllerPath = controllerPath;
		props.schema = await SwaggerParseService.getViewOneSchema(controllerPath);
		props.entity = await APIFrontendService.getById(controllerPath, entityId);
		props.availableCRUDPaths = await SwaggerParseService.getAvailableCRUDPaths(controllerPath);
	}

	return {
		props,
	};
}

export default EntityPageView;