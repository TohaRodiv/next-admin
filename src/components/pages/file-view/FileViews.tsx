import { TEntity, TSchemaEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { EntityViewsHead } from "#components/pages/entity-view/entity-views/EntityViewsHead";
import { SyntheticEvent } from "react";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { FileViewsBody } from "#components/pages/file-view/file-views/FileViewsBody";
import { ButtonSave } from "../entity-view/buttons";
import { Space } from "antd";

type TProps = {
	entities: TEntity[]
	caption: string
	schema: TSchemaEntity
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
}

export const FileViews: React.FC<TProps> = ({
	entities, schema, caption, availableCRUD, controllerPath, CRUDSchema,
}): JSX.Element => {

	const handleUploadFiles = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData();
		const inputFiles = form.elements["files"];

		for (const file of inputFiles.files) {
			data.append(inputFiles.name, file);
		}

		const result = await APIFrontendService.uploadFiles(controllerPath, data);
		console.log(await result.json());
	};

	return (
		<>
			{
				availableCRUD.getPathCreateOne &&
				<form onSubmit={handleUploadFiles}>
					<Space>
						<input type="file" name="files" multiple={true} className="btn btn--light" />
						<ButtonSave text="Загрузить" />
					</Space>
				</form>
			}
			<div className="responsive-table">
				<table className="entity-views">
					<caption className="entity-views__caption">{caption}</caption>
					<EntityViewsHead schema={schema} />
					<FileViewsBody
						entities={entities}
						availableCRUD={availableCRUD}
						controllerPath={controllerPath}
						schema={schema}
						CRUDSchema={CRUDSchema} />
				</table>
			</div>
		</>
	);
};