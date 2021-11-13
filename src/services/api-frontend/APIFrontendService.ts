import { IAPI } from "#services/interfaces/IAPI";
import { TControllerPaths } from "#services/swagger-parse/types";

export const APIFrontendService = new class implements IAPI {

	protected API_URL: string = "http://localhost:3000/api/entities";

	public async getMany(controllerPath: TControllerPaths): Promise<any[]> {
		return await this.fetch(this.getFormattedUrl(controllerPath));
	}

	public async getById(controllerPath: TControllerPaths, id: number): Promise<any> {
		return await this.fetch(this.getFormattedUrl(controllerPath, id));
	}

	public async updateById(controllerPath: TControllerPaths, id: number, data: BodyInit): Promise<any> {
		return await this.fetch(this.getFormattedUrl(controllerPath, id), {
			method: "PATCH",
			body: data,
		});
	}

	public async createOne(controllerPath: TControllerPaths, data: BodyInit): Promise<any> {
		return await this.fetch(this.getFormattedUrl(controllerPath), {
			method: "POST",
			body: data,
		});
	}

	public async deleteById(controllerPath: TControllerPaths, id: number): Promise<any> {
		return await this.fetch(this.getFormattedUrl(controllerPath, id), {
			method: "DELETE",
		});
	}

	protected async fetch(url: RequestInfo, body?: RequestInit): Promise<any> {
		const response = await fetch(url, body);
		return await response.json();
	}

	protected getFormattedUrl(controllerPath: TControllerPaths, id?: number): string {
		return `${this.API_URL}${controllerPath}${id ? `/${id}` : ""}`;
	}
}