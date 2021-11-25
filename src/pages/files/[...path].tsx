import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TAvailableCRUDPaths, TControllerPaths, TEntity, TSchemaEntity } from "#services/swagger-parse/types";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { FileViews } from "#components/app/file-view/FileViews";

type TProps = {
	entities: TEntity[],
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	availableCRUDPaths: TAvailableCRUDPaths
	CRUDSchema: TSchemaCRUD
}

type TSProps = Promise<{
	props: TProps
}>

const FilesPageViews: NextPage<TProps> = ({ entities, schema, controllerPath, availableCRUDPaths, CRUDSchema, }) => {

	return (
		<>
			<Head>
				<title>Просмотр списка экземпляров сущности</title>
			</Head>
			<Container>
				<FileViews
					entities={entities}
					schema={schema}
					caption="Файлы"
					availableCRUD={SwaggerParseService.getAvailableCRUD(availableCRUDPaths, "files")}
					controllerPath={controllerPath}
					CRUDSchema={CRUDSchema} />
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
		CRUDSchema: null,
	};

	const paths = context.query["path"] as string[];

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

export default FilesPageViews;