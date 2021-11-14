import { Button } from "#components/ui/Button";
import { ButtonGroup } from "#components/ui/button-group";
import { Link } from "#components/ui/Link";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import type { TSchemaEntity, TEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { ButtonDelete, ButtonEdit } from "../buttons";

type TProps = {
	schema: TSchemaEntity
	entity: TEntity
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
}

export const EntityView: React.FC<TProps> = ({ schema, entity, availableCRUD, controllerPath, }): JSX.Element => {
	const { properties: schemaProps } = schema;

	const handleDelete = async (entityId: number) => {
		if (confirm("Удалить?")) {
			const result = await APIFrontendService.deleteById(controllerPath, entityId);
			console.log(result);
		}
	};

	return (
		<div className="entity-view">
			{
				Object.keys(schemaProps).map((schemaKey) => {
					let title = schemaKey;
					let value = "<Значение не найдено>";

					if (typeof entity[schemaKey] !== "undefined") {
						value = entity[schemaKey].toString();
						title = schemaProps[schemaKey]["title"] ? schemaProps[schemaKey]["title"] : schemaKey;
					}

					return (
						<div className="entity-view__item" key={schemaKey}>
							<div className="entity-view__title">{title}</div>
							<div className="entity-view__value">{value}</div>
						</div>
					);
				})
			}
			<ButtonGroup>
				{
					availableCRUD.getPathUpdateOne && (
						<ButtonEdit path={availableCRUD.getPathUpdateOne(entity.id)} />
					)
				}

				{
					availableCRUD.getPathDeleteOne && (
						<ButtonDelete controllerPath={controllerPath} entityId={entity.id} />
					)
				}
			</ButtonGroup>
		</div>
	);
}