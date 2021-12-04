import { TDataFields } from "#components/app/data-view/types";
import { DataView } from "#components/app/data-view/view/DataView";
import { EntityView } from "#components/app/entity-view/view";
import { getFormattedBytes } from "#libs/getFormattedBytes";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TAvailableCRUDPaths, TControllerPaths, TEntity, TSchemaEntity } from "#services/swagger-parse/types";
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
}

type TSProps = {
	props: TProps,
}

const EntityPageView: React.FC<TProps> = ({ entity, schema, controllerPath, availableCRUDPaths, CRUDSchema, }): JSX.Element => {

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
				return [`http://ec2-3-137-142-10.us-east-2.compute.amazonaws.com/${entityValue}`];
			},
		}
	};

	return (
		<>
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
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		entity: null,
		schema: null,
		controllerPath: null,
		availableCRUDPaths: null,
		CRUDSchema: null,
	};

	const paths = context.query["path"] as string[];
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