import { TEntity, TSchemaEntity } from "#services/swagger-parse/types";
import { getTypeField } from "../libs/getTypeField";

type TProps = {
	entity: TEntity
	schema: TSchemaEntity
	isDiv?: boolean
}

function getFormattedField(type: string, value: any) {
	console.log(type, value);
	switch (type) {
		case "number":
		case "password":
		case "email":
		case "text":
			return value.toString();
		case "date":
			return new Date(value).toLocaleString("ru", {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				weekday: 'long',
				timeZone: 'UTC',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			});
		case "checkbox":
			return (
				<input type="checkbox" defaultChecked={!!value} disabled={true} />
			);

		default:
			return value.toString();
	}
}

export const EntityViewsFormatted: React.FC<TProps> = ({ entity, schema, isDiv, }): JSX.Element => {
	return (
		<>
			{
				Object.keys(entity).map((entityKey, index) => {
					const entityValue = entity[entityKey];
					let type = null;
					let formattedField = null;

					if (typeof schema.properties[entityKey] === "undefined") {
						throw new Error(`Entity key "${entityKey}" dos't exist in schema!'`);
					}

					const schemaValue = schema.properties[entityKey];

					if (schemaValue.type && schemaValue.type !== "array" && schemaValue.type !== "object") {
						type = getTypeField(schemaValue.type, schemaValue.format);
						formattedField = getFormattedField(type, entityValue);
					}

					if (isDiv) {
						return (
							<div key={`entity-${entityKey}-${index}`}>
								{formattedField}
							</div>
						);
					} else {
						return (
							<td key={`entity-${entityKey}-${index}`}>
								{formattedField}
							</td>
						);
					}
				})
			}
		</>
	);
};