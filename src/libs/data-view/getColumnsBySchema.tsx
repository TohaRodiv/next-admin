import { TSchemaEntity } from "#services/swagger-parse/types";

type TOptions = {
	isSorted: boolean
}

export function getColumnsBySchema(
	schema: TSchemaEntity,
	{
		isSorted,
	}: TOptions
) {
	const { properties: schemaProps } = schema;
	const result: any[] = [
		{
			title: "Операции",
			key: "operations",
			dataIndex: "operation",
		}
	];

	Object.entries(schemaProps).forEach(([propName, property]) => {
		const title = property["title"] || propName;

		const column: any = {
			title,
			key: propName,
			dataIndex: propName,
			sorter: isSorted,
		};

		result.push(column);
	});

	return result;
}