import { NextApiRequest } from "next";
import formidable from "formidable";

export async function parseFormData(req: NextApiRequest): Promise<any> {
	return await new Promise((resolve, reject) => {
		const form = formidable();

		form.parse(req, (err, fields, files) => {
			if (err) {
				reject({ err });
			}

			resolve({ err, fields, files });
		});
	});
}