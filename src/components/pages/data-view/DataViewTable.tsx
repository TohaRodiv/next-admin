import { getDataSource, getColumnsBySchema, getSortedEntities } from "#libs/data-view";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TEntity, TSchemaEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { Divider, Space, Switch, Table } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import { useState } from "react";
import { ButtonCreate } from "../entity-view/buttons";
import { ButtonUpdateMany } from "../entity-view/buttons/ButtonUpdateMany";

type TProps = {
	entities: TEntity[]
	caption: string
	schema: TSchemaEntity
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
}

type DataType = {
	key: React.Key,
	[propName: string]: any
}


export const DataViewTable: React.FC<TProps> = ({
	entities: _entities, schema, caption, availableCRUD, controllerPath, CRUDSchema,
}): JSX.Element => {

	const [entities, setEntities] = useState(_entities);
	const [loading, setLoading] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [queryBuilder] = useState(APIFrontendService.getQueryBuilder());

	const onBeforeDelete = (entityId: number): void => {
		setLoading(true);
	};

	const handleDelete = (deletedEntity: TEntity): void => {
		setEntities(entities.filter(entity => entity.id !== deletedEntity.id));
		setLoading(false);
	};

	const handleBeforeUpdateMany = (): void => {
		setLoading(true);
	};

	const handleUpdateMany = (entities: TEntity[]): void => {
		setEntities(entities);
		setLoading(false);
	};

	/**
	 * @param pagination 
	 * @param filters 
	 * @param sorter 
	 */
	const handleTableChange = async (pagination: any, filters: any, sorter: any): Promise<void> => {
		setLoading(true);


		const result = await getSortedEntities({
			sorter,
			controllerPath,
			queryBuilder,
		});


		setEntities(result);

		setLoading(false);
	};


	const dataSource = getDataSource({
		entities,
		schema,
		availableCRUD,
		controllerPath,
		CRUDSchema,
		handleDelete,
		onBeforeDelete,
	});

	const columns = getColumnsBySchema(schema, {
		isSorted,
	});

	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		},
		getCheckboxProps: (record: DataType) => ({
			disabled: record.name === 'Disabled User', // Column configuration not to be checked
			name: record.name,
		}),
	};


	return (
		<>
			<ButtonGroup>
				<ButtonUpdateMany
					getQueryBuilder={() => { console.log(queryBuilder); return queryBuilder; }}
					controllerPath={controllerPath}
					onBeforeUpdate={handleBeforeUpdateMany}
					onUpdate={handleUpdateMany}
					loading={loading} />
				{
					availableCRUD.getPathCreateOne &&
					<ButtonCreate path={availableCRUD.getPathCreateOne()} />
				}
			</ButtonGroup>
			<Divider />

			<label>
				<Space>
					<Switch onChange={(checked) => { setIsSorted(checked) }} />
					<span>Сортировка</span>
				</Space>
			</label>

			<Divider />
			<Table
				size="small"
				onChange={handleTableChange}
				loading={loading}
				rowSelection={rowSelection}
				dataSource={dataSource}
				columns={columns} />
		</>
	);
};