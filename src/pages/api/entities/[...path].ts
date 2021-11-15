import { SwaggerParseService } from "#services/swagger-parse";
import { NextApiRequest, NextApiResponse } from "next";


export default async function API(req: NextApiRequest, res: NextApiResponse): Promise<any> {
	const queryPath = req.query["path"] as string[];
	let entityId = null;

	if (isFinite(+queryPath.at(-1))) {
		entityId = +(queryPath.pop());
	}

	const controllerPath = SwaggerParseService.getControlerPathFromArray(queryPath);

	switch (req.method) {
		case "GET":
			if (entityId) {
				const response = await SwaggerParseService.APIService.getById(controllerPath, entityId);
				const result = await response.json();
				res.status(response.status).send(result);
			} else {
				const response = await SwaggerParseService.APIService.getMany(controllerPath);
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
