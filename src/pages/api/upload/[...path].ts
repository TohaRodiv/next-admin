import { parseFormData } from "#libs/parse-form-data/parseFormData";
import { SwaggerParseService } from "#services/swagger-parse";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function API(req: NextApiRequest, res: NextApiResponse): Promise<any> {
	const queryPath = req.query["path"] as string[];
	let entityId = null;

	if (isFinite(+queryPath.at(-1))) {
		entityId = +(queryPath.pop());
	}

	const controllerPath = SwaggerParseService.getControlerPathFromArray(queryPath);

	switch (req.method) {

		case "POST":
			const { files } = await parseFormData(req, { multiples: true, });
			const response = await SwaggerParseService.APIService.uploadFiles(controllerPath, files);
			const result = await response.json();
			res.status(response.status).send(result);
			break;

		case "PATCH":
			if (!entityId) {
				res.status(400).send({ message: "EntityId required!" });
			} else {
				const { files: file } = await parseFormData(req);

				const response = await SwaggerParseService.APIService.updateFileById(controllerPath, entityId, file);
				const result = await response.json();
				res.status(response.status).send(result);
			}
			break;

		default:
			res.status(405).send({ message: "Method not allowed" });
	}
}
