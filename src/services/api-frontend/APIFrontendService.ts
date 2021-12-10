import { appConfig } from "#config/app-config";
import { IAPI } from "#services/interfaces/IAPI";
import { TControllerPaths } from "#services/swagger-parse/types";
import { RequestQueryBuilder } from "@nestjsx/crud-request";

export const APIFrontendService = new class implements IAPI {

	protected API_URL: string = appConfig.LOCAL_API_ENTITIES_URL;
	protected API_URL_UPLOAD = appConfig.LOCAL_API_UPLOAD_URL;

	constructor() {
		RequestQueryBuilder.setOptions({
			delim: "||",
			delimStr: ",",
			paramNamesMap: {
				fields: ["fields", "select"],
				search: "s",
				filter: ["filter[]", "filter"],
				or: ["or[]", "or"],
				join: ["join[]", "join"],
				sort: ["sort[]", "sort"],
				limit: ["per_page", "limit"],
				offset: ["offset"],
				page: ["page"],
				cache: ["cache"]
			}
		});
	}

	public getQueryBuilder(): RequestQueryBuilder {
		return RequestQueryBuilder.create();
	}

	public async getMany(controllerPath: TControllerPaths, params?: RequestQueryBuilder): Promise<any> {
		return await this.fetch(this.getFormattedUrl(controllerPath, null, params));
	}

	public async getById(controllerPath: TControllerPaths, id: number, params?: RequestQueryBuilder): Promise<any> {
		return await this.fetch(this.getFormattedUrl(controllerPath, id, params));
	}

	public async updateById(controllerPath: TControllerPaths, id: number, data: object): Promise<any> {
		return await this.fetch(this.getFormattedUrl(controllerPath, id), {
			method: "PATCH",
			body: JSON.stringify(data),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
	}

	public async createOne(controllerPath: TControllerPaths, data: object): Promise<any> {
		return await this.fetch(this.getFormattedUrl(controllerPath), {
			method: "POST",
			body: JSON.stringify(data),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
	}

	public async deleteById(controllerPath: TControllerPaths, id: number): Promise<any> {
		return await this.fetch(this.getFormattedUrl(controllerPath, id), {
			method: "DELETE",
		});
	}

	public async uploadFiles(controllerPath: TControllerPaths, data: FormData): Promise<any> {
		return await this.fetch(this.getFormattedUrlUpload(controllerPath), {
			method: "POST",
			body: data,
		});
	}

	public async updateFileById(controllerPath: TControllerPaths, fileId: number, data: FormData): Promise<any> {
		return await this.fetch(this.getFormattedUrlUpload(controllerPath, fileId), {
			method: "PATCH",
			body: data,
		});
	}

	protected async fetch(url: RequestInfo, body?: RequestInit): Promise<any> {
		return await fetch(url, body);
	}

	protected getFormattedUrl(controllerPath: TControllerPaths, id?: number, params?: RequestQueryBuilder): string {
		return `${this.API_URL}${controllerPath}${id ? `/${id}` : ""}${params ? `?${params.query()}` : ""}`;
	}

	protected getFormattedUrlUpload(controllerPath: TControllerPaths, id?: number): string {
		return `${this.API_URL_UPLOAD}${controllerPath}${id ? `/${id}` : ""}`;
	}
}