import { Button } from "#components/ui/Button";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TEntity, TSchemaEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { SyntheticEvent } from "react";
import { Link } from "../../ui/Link";
import { ButtonCreate, ButtonDelete, ButtonEdit, ButtonView } from "./buttons";

type TProps = {
	entities: TEntity[]
	caption: string
	schema: TSchemaEntity
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
}

export const EntityViews: React.FC<TProps> = ({ entities, schema, caption, availableCRUD, controllerPath, }): JSX.Element => {

	const { properties: schemaProps } = schema;
	const countEntities = entities.length;

	return (
		<>
			{
				availableCRUD.getPathCreateOne &&
				<ButtonCreate path={availableCRUD.getPathCreateOne()} />
			}
			<table>
				<caption>{caption}</caption>
				<thead>
					<tr>
						<th>
							<label>
								<input type="checkbox" name="selected-all-entities" />
								<span>Выбрать все</span>
							</label>
						</th>
						{
							Object.keys(schemaProps).map((propName: string) => {
								const title =
									typeof schemaProps[propName]["title"] !== "undefined" ?
										schemaProps[propName]["title"] :
										propName;

								return (
									<th key={propName}>{title}</th>
								);
							})
						}
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						!!entities.length && entities.map((entity, index) => (
							<tr key={`entity-${index}`}>
								<td>
									<input type="checkbox" name="selected-entity" />
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
								<td>
									{
										availableCRUD.getPathUpdateOne && (
											<ButtonEdit path={availableCRUD.getPathUpdateOne(entity.id)} text={false} />
										)
									}
								</td>
								<td>
									{
										availableCRUD.getPathGetOne && (
											<ButtonView path={availableCRUD.getPathGetOne(entity.id)} text={false} />
										)
									}
								</td>
								<td>
									{
										availableCRUD.getPathDeleteOne && (
											<ButtonDelete controllerPath={controllerPath} entityId={entity.id} text={false} />
										)
									}
								</td>
							</tr>
						))
					}
				</tbody>
				<tfoot>
					<tr>
						<th>Кол-во записей:</th>
						<td>{countEntities}</td>
					</tr>
				</tfoot>
			</table>
		</>
	);
};