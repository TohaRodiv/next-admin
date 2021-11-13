import { Button } from "#components/ui/Button";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TEntity, TSchemaEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { SyntheticEvent } from "react";
import { Link } from "../../ui/Link";

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

	const handleDelete = async (entityId: number) => {
		if (confirm("Удалить?")) {
			const result = await APIFrontendService.deleteById(controllerPath, entityId);
			console.log(result);
		}
	};

	return (
		<>
			{
				availableCRUD.getPathCreateOne &&
				<Link href={availableCRUD.getPathCreateOne()}>Добавить</Link>
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
											<Link href={availableCRUD.getPathUpdateOne(entity.id)}>Редактировать</Link>
										)
									}
								</td>
								<td>
									{
										availableCRUD.getPathGetOne && (
											<Link href={availableCRUD.getPathGetOne(entity.id)}>Просмотр</Link>
										)
									}
								</td>
								<td>
									{
										availableCRUD.getPathDeleteOne && (
											<Button onClick={() => handleDelete(entity.id)}>Удалить</Button>
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