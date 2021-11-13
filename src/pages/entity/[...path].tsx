import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { EntityViews } from "#components/app/entity-view";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TAvailableCRUDPaths, TControllerPaths, TEntity, TSchemaEntity } from "#services/swagger-parse/types";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";

type TProps = {
	entities: TEntity[],
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	availableCRUDPaths: TAvailableCRUDPaths
}

type TSProps = Promise<{
	props: TProps
}>

const EntityPageViews: NextPage<TProps> = ({ entities, schema, controllerPath,availableCRUDPaths }) => {

	return (
		<>
			<Head>
				<title>Просмотр списка экземпляров сущности</title>
			</Head>
			<Container>
				<>
					<EntityViews
						entities={entities}
						schema={schema}
						caption="Задачи"
						availableCRUD={SwaggerParseService.getAvailableCRUD(availableCRUDPaths)}
						controllerPath={controllerPath} />
				</>
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		entities: null,
		schema: null,
		controllerPath: null,
		availableCRUDPaths: null,
	};

	const paths = context.query["path"] as string[];

	if (Array.isArray(paths)) {
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.controllerPath = controllerPath;
		props.schema = await SwaggerParseService.getViewManySchema(controllerPath);
		props.entities = await APIFrontendService.getMany(controllerPath);
		props.availableCRUDPaths = await SwaggerParseService.getAvailableCRUDPaths(controllerPath);
	}

	return {
		props,
	};
}

export default EntityPageViews;