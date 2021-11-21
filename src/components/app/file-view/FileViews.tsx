import { TEntity, TSchemaEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { EntityViewsHead } from "#components/app/entity-view/entity-views/EntityViewsHead";
import { SyntheticEvent } from "react";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { FileViewsBody } from "#components/app/file-view/file-views/FileViewsBody";
import { ButtonSave } from "../entity-view/buttons";
import { ButtonGroup } from "#components/ui/button-group";

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
					<ButtonGroup>
						<input type="file" name="files" multiple={true} className="btn btn--light" />
						<ButtonSave text="Загрузить" />
					</ButtonGroup>
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