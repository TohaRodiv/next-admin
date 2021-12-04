import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TAvailableCRUDPaths, TControllerPaths, TEntity, TSchemaEntity } from "#services/swagger-parse/types";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { DataViewList } from "#components/app/data-view";
import { getFormattedBytes } from "#libs/getFormattedBytes";
import { ButtonSave } from "#components/app/entity-view/buttons";
import { SyntheticEvent, useState } from "react";
import { ButtonGroup } from "#components/ui/button-group";
import { Section } from "#components/skeleton/Section";
import { message } from "antd";
import { TDataFields } from "#components/app/data-view/types";

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
		<>
			<Head>
				<title>Просмотр списка экземпляров сущности</title>
			</Head>
			<Container>
				<Section>
					{
						availableCRUD.getPathCreateOne &&
						<form onSubmit={handleUploadFiles}>
							<ButtonGroup>
								<input type="file" name="files" multiple={true} className="btn btn--light" />
								<ButtonSave text="Загрузить" />
							</ButtonGroup>
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