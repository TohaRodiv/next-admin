import { IAPI } from "#services/interfaces/IAPI";
import { TControllerPaths } from "./types";

export class APIService implements IAPI {
	protected readonly API_URL: string = `${process.env.EXTERNAL_API_URL}`;

	constructor (
		protected getControllerPaths: () => Promise<TControllerPaths>,
	) {}

	public async getMany(controllerPath: string): Promise<any> {
		this.checkControllerPath(controllerPath);

		return await this.fetch(this.getFormattedUrl(controllerPath));
	}

	public async getById(controllerPath: string, id: number): Promise<any> {
		this.checkControllerPath(controllerPath);

		return await this.fetch(this.getFormattedUrl(controllerPath, id));
	}

	public async updateById(controllerPath: string, id: number, data: object): Promise<any> {
		this.checkControllerPath(controllerPath);

		return await this.fetchJSON({
			url: this.getFormattedUrl(controllerPath, id),
			method: "PATCH",
			data,
		});
	}

	public async createOne(controllerPath: string, data: object): Promise<any> {
		this.checkControllerPath(controllerPath);

		return await this.fetchJSON({
			url: this.getFormattedUrl(controllerPath),
			method: "POST",
			data,
		});
	}

	public async deleteById(controllerPath: string, id: number): Promise<any> {
		this.checkControllerPath(controllerPath);

		return await this.fetch(this.getFormattedUrl(controllerPath, id), {
			method: "DELETE",
		});
	}

	/**
	 * @throw Error
	 */
	protected async checkControllerPath(controllerPath: string): Promise<void> {
		if (!(controllerPath in await this.getControllerPaths())) {
			throw new Error(`Path ${controllerPath} is not defined in the controller paths!`);
		}
	}

	protected async fetch(url: RequestInfo, body?: RequestInit): Promise<any> {
		return await fetch(url, body);
	}

	protected async fetchJSON({ url, method, data,}: {
		url: RequestInfo
		method: string
		data: any
	}): Promise<any> {
		return await fetch(url, {
			method,
			body: JSON.stringify(data),
			headers: new Headers({ "Content-Type": "application/json"}),
		});
	}

	protected getFormattedUrl(controllerPath: TControllerPaths, id?: number): string {
		return `${this.API_URL}${controllerPath}${id ? `/${id}` : ""}`;
	}
}