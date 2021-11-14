import { TAvailableCRUD, TControllerPaths, TEntity } from "#services/swagger-parse/types";
import { useState } from "react";
import { ButtonEdit, ButtonView, ButtonDelete } from "../buttons";
import { EntityViewsFooter } from "./EntityViewsFooter";

type TProps = {
	entities: TEntity[]
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
}

export const EntityViewsBody: React.FC<TProps> = ({ entities: _entities, availableCRUD, controllerPath, }): JSX.Element => {

	const [entities, setEntities] = useState(_entities);

	const updateState = (entities: TEntity[]) => {
		setEntities(entities);
	}

	const handleDelete = (entity: TEntity) => {
		updateState(entities.filter(({ id }) => id != entity.id));
	};

	return (
		<>
		<tbody className="entity-views__tbody">
			{
				!entities.length ? (
					<tr>
						<td colSpan={999}>Записей нет</td>
					</tr>
				) : entities.map((entity, index) => (
					<tr key={`entity-${index}`}>
						{/* <td>
							<input type="checkbox" name="selected-entity" />
						</td> */}
						<td colSpan={3}>
							{
								availableCRUD.getPathUpdateOne && (
									<ButtonEdit path={availableCRUD.getPathUpdateOne(entity.id)} text={false} />
								)
							}
							{
								availableCRUD.getPathGetOne && (
									<ButtonView path={availableCRUD.getPathGetOne(entity.id)} text={false} />
								)
							}
							{
								availableCRUD.getPathDeleteOne && (
									<ButtonDelete
										controllerPath={controllerPath}
										entityId={entity.id}
										text={false}
										onDelete={handleDelete} />
								)
							}
						</td>
						{
							Object.values(entity).map((propValue, index) => {
								const value = !!propValue && propValue.toString().substr(0, 80);
								return (
									<td key={`prop-value-${index}`}>
										{value}
									</td>
								)
							})
						}
					</tr>
				))
			}
		</tbody>
		<EntityViewsFooter countEntities={entities.length} />
	</>
	);
};