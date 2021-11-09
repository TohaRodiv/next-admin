import type { TSchemaEntity, TEntity } from "#services/swagger-parse-service/types";

type TProps = {
	schema: TSchemaEntity
	entity: TEntity
}

export const EntityView: React.FC<TProps> = ({ schema, entity, }): JSX.Element => {
	const { properties: schemaProps } = schema;

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
		</div>
	);
}