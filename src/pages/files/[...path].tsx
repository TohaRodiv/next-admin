import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TAvailableCRUDPaths, TControllerPaths, TEntity, TSchemaEntity } from "#services/swagger-parse/types";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { DataViewList } from "#components/pages/data-view";
import { getFormattedBytes } from "#libs/getFormattedBytes";
import { ButtonSave } from "#components/pages/entity-view/buttons";
import { SyntheticEvent } from "react";
import { Section } from "#components/molecules/Section";
import { message, Space } from "antd";
import { TDataFields } from "#components/pages/data-view/types";
import { checkAuthorized } from "#libs/auth/checkAuthorized";
import type { TAccessProps } from "#types/TAccessProps";
import { AuthContainer } from "#components/organisms/auth-container";
import { appConfig } from "#config/app-config";

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

const FilesPageViews: NextPage<TProps> = ({ entities, schema, controllerPath, availableCRUDPaths, CRUDSchema, access, }) => {

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
				return [`${appConfig.API_URL}/${entityValue}`];
			},
		}
	};

	const handleUploadFiles = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData();
		const inputFiles = form.elements["files"];

		for (const file of inputFiles.files) {
			data.append(inputFiles.name, file);
		}

		const response = await APIFrontendService.uploadFiles(controllerPath, data);

		if (response.status == 201) {
			const result = await response.json() as any[];
			message.success(`Успешно загруженно файлов: ${result.length}. Перезагрузите страницу для отображения файлов.`);
		} else {
			message.error(`Ошибка загрузки файлов (${response.status} - ${response.message})`);
		}
	};

	const availableCRUD = SwaggerParseService.getAvailableCRUD(availableCRUDPaths, "files");

	return (
		<AuthContainer access={access}>
			<Head>
				<title>Просмотр списка экземпляров сущности</title>
			</Head>
			<Container fluid>
				<Section>
					{
						availableCRUD.getPathCreateOne &&
						<form onSubmit={handleUploadFiles}>
							<Space>
								<input type="file" name="files" multiple={true} className="btn btn--light" />
								<ButtonSave text="Загрузить" />
							</Space>
						</form>
					}
				</Section>
				<DataViewList
					entities={entities}
					schema={schema}
					availableCRUD={availableCRUD}
					controllerPath={controllerPath}
					CRUDSchema={CRUDSchema}
					relationFields={relationFields}
				/>
			</Container>
		</AuthContainer>
	);
};

export const getServerSideProps = async ({req, query}: NextPageContext): Promise<TSProps> => {
	const props = {
		entities: null,
		schema: null,
		controllerPath: null,
		availableCRUDPaths: null,
		CRUDSchema: null,
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