import { IAPI } from "#services/interfaces/IAPI";
import { TControllerPaths } from "./types";
import FormData from "form-data";
import { createReadStream } from "fs";
import path from "path";

export class APIService implements IAPI {
	protected readonly API_URL: string = `${process.env.EXTERNAL_API_URL}`;

	constructor(
		protected getControllerPaths: () => Promise<TControllerPaths>,
	) { }

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

	public async uploadFiles(controllerPath, files: { [fieldName: string]: File[] }): Promise<any> {
		this.checkControllerPath(controllerPath);

		const formData = new FormData();

		Object
			.entries(files)
			.forEach(([fieldName, files]) => {
				if (Array.isArray(files)) {
					files.forEach(file => {
						formData.append(
							fieldName,
							createReadStream(path.resolve(file["path"])),
							file.name
						);
					});
				} else {
					formData.append(
						fieldName,
						createReadStream(path.resolve(files["path"]))
					);
				}
			});

		return await this.fetchFormData({
			url: this.getFormattedUrl(controllerPath),
			method: "POST",
			body: formData,
		});
	}

	public async updateFileById(controllerPath: TControllerPaths, fileId: number, file: {[prop: string]: File}): Promise<any> {
		this.checkControllerPath(controllerPath);

		const formData = new FormData();
		
		Object
			.entries(file)
			.forEach(([fieldName, file]) => {
				formData.append(
					fieldName,
					createReadStream(path.resolve(file["path"]))
				);
			});

		return await this.fetchFormData({
			url: this.getFormattedUrl(controllerPath, fileId),
			method: "PATCH",
			body: formData,
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

	protected async fetchJSON({ url, method, data, }: {
		url: RequestInfo
		method: string
		data: any
	}): Promise<any> {
		return await fetch(url, {
			method,
			body: JSON.stringify(data),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
	}

	protected async fetchFormData({ url, method, body, }): Promise<any> {
		return await fetch(url, {
			method,
			body,
		});
	}

	protected getFormattedUrl(controllerPath: TControllerPaths, id?: number): string {
		return `${this.API_URL}${controllerPath}${id ? `/${id}` : ""}`;
	}
}