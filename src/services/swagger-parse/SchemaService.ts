import { RefService } from "./RefService";
import { TControllerPaths, TSchemaEntity } from "./types";

export class SchemaService {
	constructor (
		protected refService: RefService,
	) {}

	public async getViewOneSchema(controllerPath: string, controllerPaths: TControllerPaths): Promise<TSchemaEntity> {
		const realControllerPath = `${controllerPath}/{id}`;
		if (realControllerPath in controllerPaths) {
			const ref = controllerPaths[realControllerPath]["get"]["responses"]["200"]["content"]["application/json"]["schema"]["$ref"];

			return await this.refService.getObjectByJsonRef(ref);
		} else {
			throw new Error(`Path ${realControllerPath} not found in controllre paths`);
		}
	}

	public async getViewManySchema(controllerPath: string, controllerPaths: TControllerPaths): Promise<TSchemaEntity> {
		if (controllerPath in controllerPaths) {
			const ref = controllerPaths[controllerPath]["get"]["responses"]["200"]["content"]["application/json"]["schema"]["oneOf"][1]["items"]["$ref"];

			return await this.refService.getObjectByJsonRef(ref);
		} else {
			throw new Error(`Path ${controllerPath} not found in controller paths!`);
		}
	}

	public async getCreateOneSchema(controllerPath: string, controllerPaths: TControllerPaths): Promise<TSchemaEntity> {
		if (controllerPath in controllerPaths) {
			const ref = controllerPaths[controllerPath]["post"]["requestBody"]["content"]["application/json"]["schema"]["$ref"];
			return await this.refService.getObjectByJsonRef(ref);
		} else {
			throw new Error(`Path ${controllerPath} not found in controller paths`);
		}
	}

	public async getUpdateOneSchema(controllerPath: string, controllerPaths: TControllerPaths): Promise<TSchemaEntity> {
		const realControllerPath = `${controllerPath}/{id}`;
		if (realControllerPath in controllerPaths) {
			const ref = controllerPaths[realControllerPath]["patch"]["requestBody"]["content"]["application/json"]["schema"]["$ref"];
			return await this.refService.getObjectByJsonRef(ref);
		} else {
			throw new Error(`Path ${realControllerPath} not found in controller paths!`);
		}
	}
}