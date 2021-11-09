import { Button } from "#components/ui/Button";
import { TSchemaEntity, TEntity } from "#services/swagger-parse-service/types";
import { HTMLInputTypeAttribute } from "react";
import { BackButton } from "../../button-back";
import { getTypeField } from "../libs/getTypeField";

type TProps = {
	schema: TSchemaEntity
	entity: TEntity
}

export const EntityEdit: React.FC <TProps> = ({ schema, entity, }): JSX.Element => {
	const { properties: schemaProps } = schema;
	return (
		<div className="entity-view">
			{
				Object.keys(schemaProps).map((schemaKey) => {
					let title = schemaKey;
					let value = "<Значение не найдено>";
					let type: HTMLInputTypeAttribute = getTypeField(schemaProps[schemaKey]["type"], schemaProps[schemaKey]["format"]);
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
								<input type={type} {...defaultValue} />
							</div>
						</div>
					);
				})
			}
			<Button>Сохранить</Button>
			<BackButton value="Отменить" />
		</div>
	);
};