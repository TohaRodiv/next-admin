import { TEntity, TSchemaEntity } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { getFormattedEntityField } from "../../../../libs/view/getFormattedEntityField";

type TProps = {
	entity: TEntity
	schema: TSchemaEntity
	CRUDSchema: TSchemaCRUD
}

export const EntityViewsFormatted: React.FC<TProps> = ({ entity, schema, CRUDSchema, }): JSX.Element => {
	return (
		<>
			{
				Object.entries(entity).map(([key, value]) => {
					const schemaValue = schema.properties[key];
					return (
						<td key={key}>
							{getFormattedEntityField(value, schemaValue, CRUDSchema)}
						</td>
					);
				})
			}
		</>
	);
};