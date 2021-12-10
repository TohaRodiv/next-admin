import { APIFrontendService } from "#services/api-frontend/APIFrontendService"
import { TControllerPaths } from "#services/swagger-parse/types"
import { RequestQueryBuilder } from "@nestjsx/crud-request"

type TGetSortedEntities = {
	sorter: {
		order: "ascend" | "descend"
		columnKey: string
	}
	controllerPath: TControllerPaths
	queryBuilder: RequestQueryBuilder
}

export async function getSortedEntities({
	sorter,
	controllerPath,
	queryBuilder,
}: TGetSortedEntities): Promise<any> {

	if (sorter.order) {
		const order = sorter.order == "ascend" ? "ASC" : "DESC";
		queryBuilder
			.sortBy([{ field: sorter.columnKey, order, }]);
	} else {
		queryBuilder.sortBy([]);
	}

	const response = await APIFrontendService.getMany(controllerPath, queryBuilder);

	return await response.json();
}