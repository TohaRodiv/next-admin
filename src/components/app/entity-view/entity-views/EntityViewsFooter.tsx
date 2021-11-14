type TProps = {
	countEntities: number
}

export const EntityViewsFooter: React.FC<TProps> = ({ countEntities, }): JSX.Element => {

	return (
		<tfoot className="entity-views__tfoot">
			<tr>
				<th>Кол-во записей:</th>
				<td colSpan={999}>{countEntities}</td>
			</tr>
		</tfoot>
	);
};