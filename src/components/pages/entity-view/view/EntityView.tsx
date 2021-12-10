import { ButtonGroup } from "#components/ui/button-group";
import type { TSchemaEntity, TEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { useRouter } from "next/router";
import { ButtonDelete, ButtonEdit } from "../buttons";
import { getFormattedEntityField } from "#libs/view/getFormattedEntityField";
import { ButtonCancel } from "../buttons/ButtonCancel";

type TProps = {
	schema: TSchemaEntity
	entity: TEntity
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
}

export const EntityView: React.FC<TProps> = ({ schema, entity, availableCRUD, controllerPath, CRUDSchema, }): JSX.Element => {
	const { properties: schemaProps } = schema;
	const router = useRouter();

	const handleDelete = async (_entity: TEntity) => {
		router.back();
	};

	return (
		<div className="entity-view">
			{
				Object.entries(entity).map(([key, value]) => {
					const schemaValue = schema.properties[key];
					return (
						<div className="entity-view__item" key={key}>
							<div className="entity-view__title">{schemaValue.title || key}</div>
							<div className="entity-view__value">{getFormattedEntityField(value, schemaValue, CRUDSchema)}</div>
						</div>
					);
				})
			}
			<ButtonGroup>
				<ButtonCancel />
				{
					availableCRUD.getPathUpdateOne && (
						<ButtonEdit path={availableCRUD.getPathUpdateOne(entity.id)} />
					)
				}

				{
					availableCRUD.getPathDeleteOne && (
						<ButtonDelete controllerPath={controllerPath} entityId={entity.id} onDelete={handleDelete} />
					)
				}
			</ButtonGroup>
		</div>
	);
}