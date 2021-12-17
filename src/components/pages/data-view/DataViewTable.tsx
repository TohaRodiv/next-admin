import { ButtonCreate, ButtonReloadMany } from "#components/molecules/action-buttons";
import { getDataSource, getColumnsBySchema, getSortedEntities } from "#libs/data-view";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TEntity, TSchemaEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { ControlOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Select, Space, Switch, Table } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import type { SizeType } from "antd/lib/config-provider/SizeContext";
import { useState } from "react";

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
	const [tableSize, setTableSize] = useState<SizeType>("middle");
	const [isEllipsized, setIsEllipsized] = useState(false);
	const [isSearched, setIsSearched] = useState(false);
	const [visibleDrawer, setVisibleDrawer] = useState(false);
	const [selectedFilterCondition, setSelectedFilterCondition] = useState("$cont");
	const [queryBuilder] = useState(APIFrontendService.createQueryBuilder());

	let isSearch = false;

	const menuSizes: { label: string, value: SizeType }[] = [
		{ label: "Маленький", value: "small" },
		{ label: "Средний", value: "middle" },
		{ label: "Большой", value: "large" },
	];

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
	};

	const handleTableChange = async (pagination: any, filters: any, sorters: any): Promise<void> => {
		if (isSearch) {
			return;
		}

		setLoading(true);

		const result = await getSortedEntities({
			sorters,
			controllerPath,
			queryBuilder,
		});

		setEntities(result);

		setLoading(false);
	};

	const handleSizeTableChange = (size: SizeType) => {
		setTableSize(size);
	};

	const handleSearch = async (selectedKeys: string[], confirm: () => void, dataIndex: string, selectedFilterCondition: string): Promise<void> => {
		isSearch = true;
		setLoading(true);
		confirm();

		const params = queryBuilder.search({
			[dataIndex]: {
				[selectedFilterCondition]: selectedKeys[0]
			},
		});

		const response = await APIFrontendService.getMany(controllerPath, params)
		const result = await response.json();

		setEntities(result);

		setLoading(false);
		isSearch = false;
	};

	const handleResetSearch = (clearFilters: () => void) => {
		clearFilters();
	};

	const handleCloseDrawer = () => {
		setVisibleDrawer(false);
	};

	const handleOpenDrawer = () => {
		setVisibleDrawer(true);
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
		isEllipsized,
		isSearched,
		searchState: {
			handleSearch,
			handleReset: handleResetSearch,
			selectedFilterCondition,
			setSelectedFilterCondition
		}
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
				{
					availableCRUD.getPathCreateOne &&
					<ButtonCreate path={availableCRUD.getPathCreateOne()} />
				}
				<ButtonReloadMany
					createQueryBuilder={() => { return queryBuilder; }}
					controllerPath={controllerPath}
					onBeforeUpdate={handleBeforeUpdateMany}
					onUpdate={handleUpdateMany}
					onFinish={() => { setLoading(false); }}
					loading={loading} />
				<Button
					size="middle"
					icon={<ControlOutlined />}
					type="primary"
					ghost
					onClick={handleOpenDrawer}>
					Настройки
				</Button>
			</ButtonGroup>

			<Divider />

			<Table
				scroll={{ x: "100vw", y: "100vh", }}
				size={tableSize}
				onChange={handleTableChange}
				loading={loading}
				// rowSelection={rowSelection}
				dataSource={dataSource}
				columns={columns} />

			<Drawer
				title="Настройки"
				visible={visibleDrawer}
				onClose={handleCloseDrawer}
				placement="right">
				<div className="dropdown-search">
					<label>
						<Space>
							<Switch onChange={(checked) => { setIsSorted(checked) }} />
							<span>Сортировка</span>
						</Space>
					</label>
					<label>
						<Space>
							<Switch onChange={(checked) => { setIsSearched(checked) }} />
							<span>Поиск</span>
						</Space>
					</label>
					<label>
						<Space>
							<Switch onChange={(checked) => { setIsEllipsized(checked) }} />
							<span>Компактный вид</span>
						</Space>
					</label>
					<Select options={menuSizes} onChange={handleSizeTableChange} defaultValue={tableSize} />
				</div>
			</Drawer>
		</>
	);
};