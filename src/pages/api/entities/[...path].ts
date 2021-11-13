import { parseFormData } from "#libs/parse-form-data/parseFormData";
import { SwaggerParseService } from "#services/swagger-parse";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
	api: {
		bodyParser: false,
	}
};

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
				const result = await SwaggerParseService.APIService.getById(controllerPath, entityId);
				res.status(200).send(result);
			} else {
				const result = await SwaggerParseService.APIService.getMany(controllerPath);
				res.status(200).send(result);
			}
			break;

		case "POST":
			const body = (await parseFormData(req)).fields;
			const result = await SwaggerParseService.APIService.createOne(controllerPath, body);
			res.status(200).send(result);
			break;

		case "PATCH":
			if (!entityId) {
				res.status(400).send({ message: "EntityId required!" });
			} else {
				const body = (await parseFormData(req)).fields;
				const result = await SwaggerParseService.APIService.updateById(controllerPath, entityId, body);
				res.status(200).send(result);
			}
			break;

		case "DELETE":
			if (!entityId) {
				res.status(400).send({ message: "EntityId required!" });
			} else {
				const result = await SwaggerParseService.APIService.deleteById(controllerPath, entityId);
				res.status(200).send(result);
			}
			break;

		default:
			res.status(405).send({ message: "Method not allowed" });
	}
}
