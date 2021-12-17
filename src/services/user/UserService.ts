import { isServer } from "#libs/isServer";
import { TLogin } from "./types";
import { set as setCookie, get as getCookie } from "js-cookie";

export const UserService = new class {

	private isAuthorized: boolean = false;

	public async login({ username, password }: TLogin): Promise<boolean> {
		const response = await fetch("/api/authorizations", {
			method: "POST",
			body: JSON.stringify({
				username, password,
			}),
		});

		if (response.ok) {
			const result = await response.json();

			if (result.access_token) {

				this.isAuthorized = true;

				if (!isServer()) {
					this.setTokens({ access_token: result.access_token });
				}

				return true;
			} else {
				throw new Error("Access token not found in api response! Result:", result);
			}
		} else {
			return false;
		}
	}

	public logout(): void { }

	public checkAuthorized(): boolean {
		return this.isAuthorized;
	}

	public setTokens({ access_token, }) {
		let dateUTC = new Date((new Date(Date.now() + 1000 * 60 * 30)).toUTCString());
		console.log(dateUTC);
		setCookie("access_token", access_token, {
			expires: dateUTC,
		});
	}

	public getTokens() {
		return {
			access_token: getCookie("access_token"),
		};
	}

	public async asyncCheckAuthorized(): Promise<boolean> {
		const response = await fetch(`/api/authorizations?access_token=${this.getTokens().access_token}`);

		return response.ok;
	}

	public setAuthorized(isAuthorized: boolean): void {
		this.isAuthorized = isAuthorized;
	}
};