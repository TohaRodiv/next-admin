import { IncomingMessage } from "http";
import jsHttpCookie from "cookie";
import { TAccessProps } from "#types/TAccessProps";

export async function checkAuthorized(req: IncomingMessage): Promise<TAccessProps> {
	const returnData = {
		access_token: null,
		isAuthorized: false,
	};

	if (req && req.headers) {
		const cookies = req.headers.cookie;

		if (typeof cookies === "string") {
			const cookieJSON = jsHttpCookie.parse(cookies);
			const access_token = cookieJSON.access_token;

			if (access_token) {
				const response =
					await fetch(`${process.env.LOCAL_API_URL}/api/authorizations?access_token=${access_token}`);

				if (response.ok) {
					returnData.access_token = access_token;
					returnData.isAuthorized = true;
				}
			}
		}
	}

	return returnData;
}