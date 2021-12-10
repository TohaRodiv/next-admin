import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { EntityEdit } from "#components/pages/file-view/edit/EntityEdit";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TControllerPaths, TEntity, } from "#services/swagger-parse/types";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";

type TProps = {
	entity: TEntity
	controllerPath: TControllerPaths
}

type TSProps = {
	props: TProps
}

const EntityPageViews: NextPage<TProps> = ({
	entity, controllerPath,
}) => {

	return (
		<>
			<Head>
				<title>Редактор файла</title>
			</Head>
			<Container>
				<EntityEdit
					entity={entity}
					controllerPath={controllerPath} />
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		entity: null,
		controllerPath: null,
	};

	const paths = context.query["path"] as string[];
	const entityId = +paths.pop();

	if (isFinite(entityId)) {
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.controllerPath = controllerPath;
		const responseEntity = await APIFrontendService.getById(controllerPath, entityId);
		props.entity = await responseEntity.json();
	}

	return {
		props: props,
	};
}

export default EntityPageViews;