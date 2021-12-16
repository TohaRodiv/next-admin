import { AuthContainer } from "#components/organisms/auth-container";
import { DataCreate } from "#components/pages/data-view/create";
import { checkAuthorized } from "#libs/auth/checkAuthorized";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TControllerPaths, TRelations, TSchemaEntity } from "#services/swagger-parse/types";
import { TAccessProps } from "#types/TAccessProps";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";

type TProps = {
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
	relations: TRelations
	access: TAccessProps
}

type TSProps = {
	props: TProps
}

const EntityPageViews: NextPage<TProps> = ({ schema, controllerPath, CRUDSchema, relations, access, }): JSX.Element => {

	return (
		<AuthContainer access={access}>
			<Head>
				<title>Создать новый экземпляр сущности</title>
			</Head>
			<Container>
				<DataCreate
					schema={schema}
					controllerPath={controllerPath}
					CRUDSchema={CRUDSchema}
					relations={relations} />
			</Container>
		</AuthContainer>
	);
};

export const getServerSideProps = async ({req, query}: NextPageContext): Promise<TSProps> => {
	const props = {
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


	const paths = query["path"] as string[];

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