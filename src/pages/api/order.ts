import { parseFormData } from "#libs/parse-form-data/parseFormData";
import { NextApiRequest, NextApiResponse } from "next";


export const config = {
	api: {
		bodyParser: false
	}
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
	if (req.method === "POST") {

		const data = await parseFormData(req);

		res.status(201).json({});
	}
}
