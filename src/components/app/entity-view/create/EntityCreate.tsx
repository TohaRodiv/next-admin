import { TControllerPaths, TRelations, TSchemaEntity } from "#services/swagger-parse/types";
import React, { HTMLInputTypeAttribute, SyntheticEvent } from "react";
import { BackButton } from "../../button-back";
import { getTypeField } from "../libs/getTypeField";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { ButtonGroup } from "#components/ui/button-group";
import { ButtonSave } from "../buttons";
import { useRouter } from "next/router";
import { formToJSON } from "../libs/formToJSON";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { getFormattedEntityField } from "../libs/create-update/getFormattedEntityField";


type TProps = {
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
	relations: TRelations
}

export const EntityCreate: React.FC<TProps> = ({ schema, controllerPath, CRUDSchema, relations, }): JSX.Element => {
	// return null;
	const { properties: schemaProps } = schema;
	const router = useRouter();

	const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = formToJSON(form.elements, schemaProps);
		const response = await APIFrontendService.createOne(controllerPath, data);
		const result = await response.json();
		
		if (201 !== response.status) {
			console.error(response.status, result);
		} else {
			router.back();
		}
	};


	return (
		<form onSubmit={handleSubmit} className="entity-view">
			{
				Object.entries(schemaProps).map(([schemaKey, schemaValue]) => {
					let title = schemaValue["title"] ? schemaValue["title"] : schemaKey;

					return (
						<label className="entity-view__item" key={schemaKey}>
							<div className="entity-view__title">{title}</div>
							<div className="entity-view__value">
								{getFormattedEntityField({
									CRUDSchema,
									defaultValue: null,
									schemaKey,
									schemaValue,
									isRequired: schema.required.includes(schemaKey),
									relations,
								})}
							</div>
						</label>
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