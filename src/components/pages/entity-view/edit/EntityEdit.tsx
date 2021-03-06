import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TSchemaEntity, TEntity, TControllerPaths, TRelations } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { useRouter } from "next/router";
import { HTMLInputTypeAttribute, SyntheticEvent, } from "react";
import { ButtonSave } from "../buttons";
import { getFormattedEntityField } from "#libs/create-update/getFormattedEntityField";
import { formToJSON } from "#libs/formToJSON";
import { getTypeField } from "#libs/getTypeField";
import { message, } from "antd";
import { ButtonCancel } from "../buttons/ButtonCancel";
import { Group } from "antd/lib/avatar";

type TProps = {
	schema: TSchemaEntity
	entity: TEntity
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
	relations: TRelations
}


export const EntityEdit: React.FC<TProps> = ({ schema, entity, controllerPath, CRUDSchema, relations, }): JSX.Element => {
	const { properties: schemaProps } = schema;
	const router = useRouter();

	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = formToJSON(e.currentTarget.elements, schemaProps);
		const response = await APIFrontendService.updateById(controllerPath, entity.id, data);
		const result = await response.json();

		if (200 !== response.status) {
			console.error(response.status, result);
			message.error("Произошла ошибка изменения!");
		} else {
			message.success("Запись успешно изменена!");
			router.back();
		}
	};

	console.count();

	return (
		<>
			<form className="entity-view" onSubmit={handleSubmit}>
				{
					Object.entries(schemaProps).map(([schemaKey, schemaValue]) => {
						let title = schemaKey;
						let value = "<Значение не найдено>";
						let type: HTMLInputTypeAttribute = getTypeField(
							schemaProps[schemaKey]["type"],
							schemaProps[schemaKey]["format"]
						);
						const defaultValue: {
							defaultValue?: any
							defaultChecked?: boolean
						} = {};

						if (typeof entity[schemaKey] !== "undefined") {
							value = entity[schemaKey];
							title = schemaProps[schemaKey]["title"] ? schemaProps[schemaKey]["title"] : schemaKey;
						}

						switch (type) {
							case "checkbox":
								defaultValue.defaultChecked = !!value;
								break;
							default:
								defaultValue.defaultValue = value ? value.toString() : null;
						}
						return (
							<div className="entity-view__item" key={schemaKey}>
								<div className="entity-view__title">{title}</div>
								<div className="entity-view__value">
									{/*  */}
								</div>
							</div>
						);
					})
				}
				<Group>
					<ButtonCancel />
					<ButtonSave />
				</Group>
			</form>
		</>
	);
};