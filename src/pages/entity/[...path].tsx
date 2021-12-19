import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TAvailableCRUDPaths, TControllerPaths, TEntity, TSchemaEntity } from "#services/swagger-parse/types";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { DataViewTable } from "#components/pages/data-view";
import { AuthContainer } from "#components/organisms/auth-container";
import { TAccessProps } from "#types/TAccessProps";
import { checkAuthorized } from "#libs/auth/checkAuthorized";

type TProps = {
	entities: TEntity[],
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	availableCRUDPaths: TAvailableCRUDPaths
	CRUDSchema: TSchemaCRUD
	access: TAccessProps
}

type TSProps = Promise<{
	props: TProps
}>

const EntityPageViews: NextPage<TProps> = ({ entities, schema, controllerPath, availableCRUDPaths, CRUDSchema, access, }) => {

	return (
		<AuthContainer access={access}>
			<Head>
				<title>Просмотр списка экземпляров сущности</title>
			</Head>
			<Container fluid>
				<DataViewTable
					entities={entities}
					schema={schema}
					caption="Задачи"
					availableCRUD={SwaggerParseService.getAvailableCRUD(availableCRUDPaths)}
					controllerPath={controllerPath}
					CRUDSchema={CRUDSchema} />
			</Container>
		</AuthContainer>
	);
};

export const getServerSideProps = async ({ req, res, query, }: NextPageContext): Promise<TSProps> => {
	const props = {
		entities: null,
		schema: null,
		controllerPath: null,
		availableCRUDPaths: null,
		CRUDSchema: null,
		access: {
			isAuthorized: false,
			access_token: null,
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

	if (Array.isArray(paths)) {
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.controllerPath = controllerPath;
		props.schema = await SwaggerParseService.getViewManySchema(controllerPath);
		const responseMany = await APIFrontendService.getMany(controllerPath);
		props.entities = await responseMany.json();
		props.availableCRUDPaths = await SwaggerParseService.getAvailableCRUDPaths(controllerPath);
		props.CRUDSchema = await SwaggerParseService.getSchemaCRUD();
	}

	return {
		props,
	};
}

export default EntityPageViews;