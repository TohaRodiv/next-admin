import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TEntity, TControllerPaths } from "#services/swagger-parse/types";
import { SyntheticEvent, useState } from "react";
import { ButtonSave } from "#components/pages/entity-view/buttons";
import { FileThumbView } from "../file-views/FileThumbView";
import { Space } from "antd";

type TProps = {
	entity: TEntity
	controllerPath: TControllerPaths
}


export const EntityEdit: React.FC<TProps> = ({ entity, controllerPath, }): JSX.Element => {
	const [imageUrl, setImageUrl] = useState(`${entity.path}`);

	const handleUploadFiles = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData();
		const inputFiles = form.elements["file"];

		data.append(inputFiles.name, inputFiles.files[0], inputFiles.files[0].name);

		const response = await APIFrontendService.updateFileById(controllerPath, entity.id, data);
		const result = await response.json();

		if (response.status === 200) {
			setImageUrl(result.path);
		}

	};

	return (
		<form className="entity-view" onSubmit={handleUploadFiles}>
			<div className="entity-view__item">
				<div className="entity-view__title"></div>
				<div className="entity-view__value">
					<FileThumbView path={imageUrl} mimeType={entity.mimeType} />
				</div>
			</div>
			<div className="entity-view__item">
				<div className="entity-view__title">Файл</div>
				<div className="entity-view__value">
					<input type="file" name="file" className="btn btn--light" />
				</div>
			</div>
			<Space>
				<ButtonSave />
			</Space>
		</form>
	);
};