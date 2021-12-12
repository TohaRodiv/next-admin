import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Space, Button, Select } from "antd";

type TProps = {
	selectedFilterCondition: string
	setSelectedFilterCondition: (condition: string) => void
	handleSearch: (selectedKeys: string[], confirm: () => void, dataIndex: string, selectedFilterCondition: string) => void
	handleReset: (clearFilters: () => void) => void
}

export const getColumnSearchProps: CallableFunction = (dataIndex: string, {
	handleSearch,
	handleReset,
	selectedFilterCondition,
	setSelectedFilterCondition
}: TProps) => {
	let searchInput = null;
	const searchOptions: Array<{ label: string, value: string }> = [
		{ label: "Содержит", value: "$cont" },
		{ label: "Равно", value: "$eq" },
		{ label: "Не равно", value: "$ne" },
		{ label: "Больше", value: "$gt" },
		{ label: "Больше, либо равно", value: "$gte" },
		{ label: "Меньше", value: "$lt" },
		{ label: "Меньше, либо равно", value: "$lte" },
		{ label: "Содержит в начале", value: "$starts" },
		{ label: "Содержит в конце", value: "$ends" },
		{ label: "Не содержит", value: "$excl" },
		{ label: "NULL", value: "$isnull" },
		{ label: "NOT NULL", value: "$notnull" },

		{ label: "Равно (без уч. рег.)", value: "$eqL" },
		{ label: "Не равно (без уч. рег.)", value: "$neL" },
		{ label: "Содержит в начале (без уч. рег.)", value: "$startsL" },
		{ label: "Содержит в конце (без уч. рег.)", value: "$endsL" },
		{ label: "Содержит (без уч. рег.)", value: "$contL" },
		{ label: "Не содержит (без уч. рег.)", value: "$exclL" },
	];

	return {
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div className="dropdown-search">
				<div className="dropdown-search__item">
					<Input
						ref={node => {
							searchInput = node;
						}}
						placeholder={`Поиск по ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
						onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex, selectedFilterCondition)} />
				</div>
				<div className="dropdown-search__item">
					<Select
						className="dropdown-search__select-condition"
						size="small"
						options={searchOptions}
						defaultValue={selectedFilterCondition}
						onChange={(value) => { setSelectedFilterCondition(value); }} />
				</div>
				<div className="dropdown-search__item">
					<Space>
						<Button
							icon={<DeleteOutlined />}
							onClick={() => handleReset(clearFilters)}
							size="middle">
							Сбросить
						</Button>
						<Button
							type="primary"
							onClick={() => handleSearch(selectedKeys, confirm, dataIndex, selectedFilterCondition)}
							icon={<SearchOutlined />}
							size="middle">
							Найти
						</Button>

					</Space>
				</div>
			</div>
		),

		filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,

		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => searchInput.select(), 100);
			}
		},
	};
};