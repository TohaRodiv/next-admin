import { TControllerPaths, TSchemaEntity } from "#services/swagger-parse/types";
import React, { HTMLInputTypeAttribute, SyntheticEvent } from "react";
import { BackButton } from "../../button-back";
import { getTypeField } from "../libs/getTypeField";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { ButtonGroup } from "#components/ui/button-group";
import { ButtonSave } from "../buttons";
import { useRouter } from "next/router";


type TProps = {
	schema: TSchemaEntity
	controllerPath: TControllerPaths
}

export const EntityCreate: React.FC <TProps> = ({ schema, controllerPath, }): JSX.Element => {
	const { properties: schemaProps } = schema;
	const router = useRouter();

	const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		const result = await APIFrontendService.createOne(controllerPath, data);
		router.back();
	};

	return (
		<form onSubmit={handleSubmit} className="entity-view">
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
			<ButtonGroup>
			<ButtonSave />
			<BackButton value="Отменить" />
			</ButtonGroup>
		</form>
	);
};