import { Button } from "#components/ui/Button";
import { ButtonGroup } from "#components/ui/button-group";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TSchemaEntity, TEntity, TControllerPaths } from "#services/swagger-parse/types";
import { useRouter } from "next/router";
import { HTMLInputTypeAttribute, SyntheticEvent } from "react";
import { BackButton } from "../../button-back";
import { ButtonSave } from "../buttons";
import { formToJSON } from "../libs/formToJSON";
import { getTypeField } from "../libs/getTypeField";

type TProps = {
	schema: TSchemaEntity
	entity: TEntity
	controllerPath: TControllerPaths
}


export const EntityEdit: React.FC<TProps> = ({ schema, entity, controllerPath, }): JSX.Element => {
	const { properties: schemaProps } = schema;
	const router = useRouter();

	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = formToJSON(e.currentTarget.elements);
		const response = await APIFrontendService.updateById(controllerPath, entity.id, data);
		const result = await response.json();
		// router.back();
	};

	return (
		<form className="entity-view" onSubmit={handleSubmit}>
			{
				Object.keys(schemaProps).map((schemaKey) => {
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
							defaultValue.defaultValue = value.toString();
					}

					return (
						<div className="entity-view__item" key={schemaKey}>
							<div className="entity-view__title">{title}</div>
							<div className="entity-view__value">
								<input type={type} name={schemaKey} {...defaultValue} />
							</div>
						</div>
					);
				})
			}
			<ButtonGroup>
				<ButtonSave />
			</ButtonGroup>
		</form>
	);
};