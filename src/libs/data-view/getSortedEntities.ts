import { APIFrontendService } from "#services/api-frontend/APIFrontendService"
import { TControllerPaths } from "#services/swagger-parse/types"
import { RequestQueryBuilder } from "@nestjsx/crud-request"

type TSorter = {
	order: "ascend" | "descend"
	columnKey: string
}

type TGetSortedEntities = {
	sorters: TSorter[] | TSorter
	controllerPath: TControllerPaths
	queryBuilder: RequestQueryBuilder
}

export async function getSortedEntities({
	sorters,
	controllerPath,
	queryBuilder,
}: TGetSortedEntities): Promise<any> {

	const sortFields = (sorter: TSorter, queryBuilder: RequestQueryBuilder): void => {
		const order = sorter.order == "ascend" ? "ASC" : "DESC";
		queryBuilder
			.sortBy({ field: sorter.columnKey, order, });
	};

	queryBuilder.queryObject["sort[]"] = [];

	if (Array.isArray(sorters)) {

		sorters.forEach(sorter => {
			sortFields(sorter, queryBuilder);
		});

	} else if (sorters["order"]) {

		sortFields(sorters, queryBuilder);

	}

	const response = await APIFrontendService.getMany(controllerPath, queryBuilder);

	return await response.json();
}