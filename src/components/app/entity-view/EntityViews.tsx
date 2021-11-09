import { TEntity, TSchemaEntity, TAvailableCRUD } from "#services/swagger-parse-service/types";
import { Link } from "../../ui/Link";

type TProps = {
	entities: TEntity[]
	caption: string
	schema: TSchemaEntity
	availableCRUD: TAvailableCRUD
}

export const EntityViews: React.FC<TProps> = ({ entities, schema, caption, availableCRUD }): JSX.Element => {

	const { properties: schemaProps } = schema;
	const countEntities = entities.length;

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
						entities.map((entity, index) => (
							<tr key={`entity-${index}`}>
								<td>
									<input type="checkbox" name="selected-entity" />
								</td>
								{
									Object.values(entity).map((propValue, index) => (
										<td key={`prop-value-${index}`}>
											{propValue.toString()}
										</td>
									))
								}
								<td>
									{
										availableCRUD.getPathUpdateOne && (
											<Link href={availableCRUD.getPathUpdateOne(1)}>Редактировать</Link>
										)
									}
								</td>
								<td>
									{
										availableCRUD.getPathGetOne && (
											<Link href={availableCRUD.getPathGetOne(1)}>Просмотр</Link>
										)
									}
								</td>
								<td>
									{
										availableCRUD.getPathDeleteOne && (
											<Link href={availableCRUD.getPathDeleteOne(1)}>Удалить</Link>
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