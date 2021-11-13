import { TControllerPaths } from "./types";

export class APIService {
	protected readonly API_URL: string = "http://todo.dv:8081";
	constructor (
		protected getControllerPaths: () => Promise<TControllerPaths>,
	) {}

	public async getMany(controllerPath: string): Promise<any[]> {
		if (controllerPath in await this.getControllerPaths()) {
			const response = await fetch(`${this.API_URL}${controllerPath}`);
			return await response.json();
		} else {
			throw new Error(`Path ${controllerPath} is not defined in the controller paths!`);
		}
	}

	public async getById(controllerPath: string, id: number): Promise<any> {
		if (controllerPath in await this.getControllerPaths()) {
			const response = await fetch(`${this.API_URL}${controllerPath}/${id}`);
			return await response.json();
		} else {
			throw new Error(`Path ${controllerPath} is not defined in the controller paths!`);
		}
	}
}