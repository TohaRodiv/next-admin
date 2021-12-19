import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TControllerPaths, TEntity, TRelations, TSchemaEntity } from "#services/swagger-parse/types";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { DataEdit } from "#components/pages/data-view/edit";
import { TAccessProps } from "#types/TAccessProps";
import { AuthContainer } from "#components/organisms/auth-container";
import { checkAuthorized } from "#libs/auth/checkAuthorized";

type TProps = {
	entity: TEntity
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
	relations: TRelations
	access: TAccessProps
}

type TSProps = {
	props: TProps
}

const EntityPageViews: NextPage<TProps> = ({
	entity, schema, controllerPath, CRUDSchema, relations, access,
}) => {

	return (
		<AuthContainer access={access}>
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
		</AuthContainer>
	);
};

export const getServerSideProps = async ({ req, query }: NextPageContext): Promise<TSProps> => {
	const props = {
		entity: null,
		schema: null,
		controllerPath: null,
		CRUDSchema: null,
		relations: null,
		access: {
			access_token: null,
			isAuthorized: false,
		}
	};

	props.access = await checkAuthorized(req);

	if (!props.access.isAuthorized) {
		return {
			props,
		};
	}

	APIFrontendService.ACCESS_TOKEN = props.access.access_token;

	const paths = query["path"] as string[];
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