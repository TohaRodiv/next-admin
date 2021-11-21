import { NextApiRequest } from "next";
import formidable from "formidable";

export async function parseFormData(req: NextApiRequest, options?: formidable.Options): Promise<any> {
	return await new Promise((resolve, reject) => {
		const form = formidable(options);

		form.parse(req, (err, fields, files) => {
			if (err) {
				reject({ err });
			}

			resolve({ err, fields, files });
		});
	});
}