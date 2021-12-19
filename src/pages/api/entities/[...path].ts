import { SwaggerParseService } from "#services/swagger-parse";
import { NextApiRequest, NextApiResponse } from "next";
import { URLSearchParams } from "url";

type TQueryParams = {
	path?: string[]
	[queryName: string]: any
}


export default async function API(req: NextApiRequest, res: NextApiResponse): Promise<any> {
	const { path: queryPath, ...params }: TQueryParams = req.query;
	let entityId = null;
	let queryParams = new URLSearchParams();

	SwaggerParseService.APIService.ACCESS_TOKEN = req.headers.authorization || null;

	/**
	 * Достаем id из get запроса (должен идти самым последним)
	 */
	if (isFinite(+queryPath[queryPath.length - 1])) {
		entityId = +(queryPath.pop());
	}

	/**
	 * Преобразуем объект query в строку get запроса
	 */
	if (params) {
		Object
			.entries(params)
			.forEach(([paramKey, paramValue]) => {
				queryParams.append(paramKey, paramValue);
			});
	}

	const controllerPath = SwaggerParseService.getControlerPathFromArray(queryPath);

	switch (req.method) {
		case "GET":
			if (entityId) {
				const response = await SwaggerParseService.APIService.getById(
					controllerPath,
					entityId,
					queryParams.toString(),
				);
				const result = await response.json();
				res.status(response.status).send(result);
			} else {
				const response = await SwaggerParseService.APIService.getMany(controllerPath, queryParams.toString());
				const result = await response.json();
				res.status(response.status).send(result);
			}
			break;

		case "POST":
			const body = req.body;
			const response = await SwaggerParseService.APIService.createOne(controllerPath, body);
			const result = await response.json();
			res.status(response.status).send(result);
			break;

		case "PATCH":
			if (!entityId) {
				res.status(400).send({ message: "EntityId required!" });
			} else {
				const body = req.body;
				const response = await SwaggerParseService.APIService.updateById(controllerPath, entityId, body);
				const result = await response.json();
				res.status(response.status).send(result);
			}
			break;

		case "DELETE":
			if (!entityId) {
				res.status(400).send({ message: "EntityId required!" });
			} else {
				const response = await SwaggerParseService.APIService.deleteById(controllerPath, entityId);
				const result = await response.json();
				res.status(response.status).send(result);
			}
			break;

		default:
			res.status(405).send({ message: "Method not allowed" });
	}
}
