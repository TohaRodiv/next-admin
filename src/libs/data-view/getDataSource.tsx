import { getActionsCRUD } from "#libs/getActionsCRUD"
import { getFormattedEntityField } from "#libs/view/getFormattedEntityField"
import type { TEntity, TAvailableCRUD, TControllerPaths, TSchemaEntity } from "#services/swagger-parse/types"
import type { TSchemaCRUD } from "#types/TSchemaCRUD"
import { Dropdown, Menu } from "antd"
import { Button } from "antd/lib/radio"

type TProps = {
	entities: TEntity[]
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
	schema: TSchemaEntity
	CRUDSchema: TSchemaCRUD
	handleDelete: (entity: TEntity) => void
	onBeforeDelete?: (entityId: number) => void
}

export function getDataSource({
	entities,
	availableCRUD,
	controllerPath,
	schema,
	CRUDSchema,
	handleDelete,
	onBeforeDelete,
}: TProps) {
	if (!entities || !entities.length) {
		return [];
	}

	return Object
		.entries(entities)
		.map(([_propName, entity]) => {

			const formattedFields = {
				operation: getActionsCRUD({
					availableCRUD,
					controllerPath,
					handleDelete,
					onBeforeDelete,
					id: entity.id,
				}),
			};

			Object
				.entries(entity)
				.forEach(([key, value]) => {

					const schemaValue = schema.properties[key];
					formattedFields[key] = getFormattedEntityField(value, schemaValue, CRUDSchema);

				});

			return {
				key: entity.id,
				...formattedFields
			};
		});
}