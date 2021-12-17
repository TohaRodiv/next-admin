import { AuthContainer } from "#components/organisms/auth-container";
import { TDataFields } from "#components/pages/data-view/types";
import { DataView } from "#components/pages/data-view/view/DataView";
import { EntityView } from "#components/pages/entity-view/view";
import { checkAuthorized } from "#libs/auth/checkAuthorized";
import { getFormattedBytes } from "#libs/getFormattedBytes";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TAvailableCRUDPaths, TControllerPaths, TEntity, TSchemaEntity } from "#services/swagger-parse/types";
import { TAccessProps } from "#types/TAccessProps";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";

type TProps = {
	entity: TEntity
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	availableCRUDPaths: TAvailableCRUDPaths
	CRUDSchema: TSchemaCRUD
	access: TAccessProps
}

type TSProps = {
	props: TProps,
}

const EntityPageView: React.FC<TProps> = ({ entity, schema, controllerPath, availableCRUDPaths, CRUDSchema, access, }): JSX.Element => {

	const relationFields: TDataFields = {
		subtitle: {
			field: "size",
			getFormattedValue(entityValue: number): string {
				return getFormattedBytes(entityValue);
			},
		},
		title: {
			field: "mimetype",
		},
		images: {
			field: "path",
			getFormattedValue(entityValue: string): string[] {
				return [`http://ec2-3-144-151-70.us-east-2.compute.amazonaws.com/${entityValue}`];
			},
		}
	};

	return (
		<AuthContainer access={access}>
			<Head>
				<title>Просмотр сущности</title>
			</Head>
			<Container>
				<DataView
					relationFields={relationFields}
					schema={schema}
					entity={entity}
					controllerPath={controllerPath}
					availableCRUD={SwaggerParseService.getAvailableCRUD(availableCRUDPaths, "files")}
					CRUDSchema={CRUDSchema} />
			</Container>
		</AuthContainer>
	);
};

export const getServerSideProps = async ({ req, query }: NextPageContext): Promise<TSProps> => {
	const props = {
		entity: null,
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

	const paths = query["path"] as string[];
	const entityId = +paths.pop();

	if (isFinite(entityId)) {
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.controllerPath = controllerPath;
		props.schema = await SwaggerParseService.getViewOneSchema(controllerPath);
		const responseId = await APIFrontendService.getById(controllerPath, entityId);
		props.entity = await responseId.json();
		props.availableCRUDPaths = await SwaggerParseService.getAvailableCRUDPaths(controllerPath);
		props.CRUDSchema = await SwaggerParseService.getSchemaCRUD();
	}

	return {
		props,
	};
}

export default EntityPageView;