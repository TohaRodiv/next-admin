import { TSchemaEntity } from "#services/swagger-parse/types";

type TProps = {
	schema: TSchemaEntity
}

export const EntityViewsHead: React.FC<TProps> = ({ schema, }): JSX.Element => {

	const { properties: schemaProps } = schema;

	return (
		<thead className="entity-views__thead">
			<tr>
				{/* <th>
					<label>
						<input type="checkbox" name="selected-all-entities" />
					</label>
				</th> */}
				<th colSpan={3}>Операции</th>
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
			</tr>
		</thead>
	);
};