import { NextApiRequest, NextApiResponse } from "next";

export default async function SwaggerDocs(req: NextApiRequest, res: NextApiResponse): Promise<any> {
	const response = await fetch(process.env.SWAGGER_DOC_URL);
	res.status(response.status).send(await response.json());
}