import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { username, password } = JSON.parse(req.body);

		const response = await fetch(`${process.env.EXTERNAL_API_URL}/auth/login`, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
		const result = await response.json();

		res.status(response.status).json(result);

	} else if (req.method === "GET") {

		const { access_token } = req.query;

		const response = await fetch (`${process.env.EXTERNAL_API_URL}/auth/profile`, {
			headers: new Headers({ "Authorization": `Bearer ${access_token}` }),
		});

		res.status(response.status).json({});

	} else {
		res.status(405).json({ message: "Method not allowed!" });
	}
}