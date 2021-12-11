import { TSchemaEntity } from "#services/swagger-parse/types";
import { Space } from "antd";
import { getColumnSearchProps } from "./getColumnSearchProps";

type TOptions = {
	isSorted: boolean
	isEllipsized: boolean
	isSearched: boolean
	searchState: {
		selectedFilterCondition: string
		setSelectedFilterCondition: (condition: string) => void
		handleSearch: (selectedKeys: string[], confirm: () => void, dataIndex: string, selectedFilterCondition: string) => void
		handleReset: (clearFilters: () => void) => void
	}
}

export function getColumnsBySchema(
	schema: TSchemaEntity,
	{
		isSorted,
		isEllipsized,
		isSearched,
		searchState,
	}: TOptions
) {
	const { properties: schemaProps } = schema;

	const commonProps = {
		ellipsis: isEllipsized,
	};

	const result: any[] = [
		{
			title: "Операции",
			key: "operations",
			dataIndex: "operation",
			width: "160px",
			render: (_, item) => (
				<Space wrap>
					{item.operation}
				</Space>
			),
			...commonProps,
		},
	];

	const getSearchProps = (propName: string, isSearched: boolean) => {
		if (isSearched) {
			return getColumnSearchProps(propName, {
				handleSearch: searchState.handleSearch,
				handleReset: searchState.handleReset,
				selectedFilterCondition: searchState.selectedFilterCondition,
				setSelectedFilterCondition: searchState.setSelectedFilterCondition,
			});
		} else {
			return {};
		}
	};

	Object.entries(schemaProps).forEach(([propName, property]) => {
		const title = property["title"] || propName;

		const column: any = {
			title,
			key: propName,
			dataIndex: propName,
			sorter: isSorted,
			...commonProps,
			...getSearchProps(propName, isSearched),
		};

		result.push(column);
	});

	return result;
}