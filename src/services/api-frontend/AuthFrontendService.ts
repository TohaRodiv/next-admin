import { appConfig } from "#config/app-config";

type TTokens = {
	access_token: string
}

export const AuthFrontendService = new class {
	protected API_URL: string = appConfig.LOCAL_API_ENTITIES_URL;

	public async authorization(username: string, password: string): Promise<TTokens | null> {
		const response = await fetch("/api/authorizations", {
			method: "POST",
			body: JSON.stringify({
				username, password,
			}),
		});

		if (response.status === 200) {
			const result = await response.json();
			
			if (result.access_token) {
				return result;
			} else {
				return null;
			}
		} else {
			return null;
		}

	}
};