import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { EntityEdit } from "#components/pages/file-view/edit/EntityEdit";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TControllerPaths, TEntity, } from "#services/swagger-parse/types";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TAccessProps } from "#types/TAccessProps";
import { AuthContainer } from "#components/organisms/auth-container";
import { checkAuthorized } from "#libs/auth/checkAuthorized";

type TProps = {
	entity: TEntity
	controllerPath: TControllerPaths
	access: TAccessProps
}

type TSProps = {
	props: TProps
}

const EntityPageViews: NextPage<TProps> = ({
	entity, controllerPath, access
}) => {

	return (
		<AuthContainer access={access}>
			<Head>
				<title>Редактор файла</title>
			</Head>
			<Container>
				<EntityEdit
					entity={entity}
					controllerPath={controllerPath} />
			</Container>
		</AuthContainer>
	);
};

export const getServerSideProps = async ({req, query}: NextPageContext): Promise<TSProps> => {
	const props = {
		entity: null,
		controllerPath: null,
		access: {
			isAuthorized: false,
			access_token: null,	
		},
	};

	props.access = await checkAuthorized(req);

	if (!props.access.isAuthorized) {
		return {
			props,
		};
	}

	const paths = query["path"] as string[];
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