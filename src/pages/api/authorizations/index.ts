import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { username, password } = JSON.parse(req.body);

		if (username == "admin" && password == "123") {
			res.json({ access_token: "access.token.value" });
		} else {
			res.status(401).json({ message: "Not authorized!" });
		}
	} else if (req.method === "GET") {

		const { access_token } = req.query;

		if (access_token == "access.token.value") {
			res.status(200).json({ access_token });
		} else {
			res.status(401).json({ message: "Not authorized!" });
		}

	} else {
		res.status(405).json({ message: "Method not allowed!" });
	}
}