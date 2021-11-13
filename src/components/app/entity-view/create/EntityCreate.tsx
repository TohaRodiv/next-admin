import { Button } from "#components/ui/Button";
import { TControllerPaths, TSchemaEntity } from "#services/swagger-parse/types";
import React, { FormEvent, HTMLInputTypeAttribute, SyntheticEvent } from "react";
import { BackButton } from "../../button-back";
import { getTypeField } from "../libs/getTypeField";
import FormDataJson from "form-data-json-convert";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";


type TProps = {
	schema: TSchemaEntity
	controllerPath: TControllerPaths
}

export const EntityCreate: React.FC <TProps> = ({ schema, controllerPath, }): JSX.Element => {
	const { properties: schemaProps } = schema;

	const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		const result = await APIFrontendService.createOne(controllerPath, data);
		console.log(result);
	};

	return (
		<form action="" method="POST" onSubmit={handleSubmit} className="entity-view">
			{
				Object.keys(schemaProps).map((schemaKey) => {
					let title = schemaProps[schemaKey]["title"] ? schemaProps[schemaKey]["title"] : schemaKey;
					let type: HTMLInputTypeAttribute = getTypeField(schemaProps[schemaKey]["type"], schemaProps[schemaKey]["format"]);
					console.log(schema.required);
					return (
						<div className="entity-view__item" key={schemaKey}>
							<div className="entity-view__title">{title}</div>
							<div className="entity-view__value">
								<input
									type={type}
									name={schemaKey}
									required={schema.required.includes(schemaKey)} />
							</div>
						</div>
					);
				})
			}
			<Button>Сохранить</Button>
			<BackButton value="Отменить" />
		</form>
	);
};