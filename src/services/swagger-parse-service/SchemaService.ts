import { RefService } from "./RefService";
import { TControllerPaths, TSchemaEntity } from "./types";

export class SchemaService {
	constructor (
		protected refService: RefService,
	) {}

	public getViewOneSchema(controllerPath: string, controllerPaths: TControllerPaths): TSchemaEntity {
		const realControllerPath = `${controllerPath}/{id}`;
		if (realControllerPath in controllerPaths) {
			const ref = controllerPaths[realControllerPath]["get"]["responses"]["200"]["content"]["application/json"]["schema"]["$ref"];

			return this.refService.getObjectByJsonRef(ref);
		} else {
			throw new Error(`Path ${realControllerPath} not found in controllre paths`);
		}
	}

	public getViewManySchema(controllerPath: string, controllerPaths: TControllerPaths): TSchemaEntity {
		if (controllerPath in controllerPaths) {
			const ref = controllerPaths[controllerPath]["get"]["responses"]["200"]["content"]["application/json"]["schema"]["oneOf"][1]["items"]["$ref"];

			return this.refService.getObjectByJsonRef(ref);
		} else {
			throw new Error(`Path ${controllerPath} not found in controller paths!`);
		}
	}

	public getCreateOneSchema(controllerPath: string, controllerPaths: TControllerPaths): TSchemaEntity {
		if (controllerPath in controllerPaths) {
			const ref = controllerPaths[controllerPath]["post"]["requestBody"]["content"]["application/json"]["schema"]["$ref"];
			return this.refService.getObjectByJsonRef(ref);
		} else {
			throw new Error(`Path ${controllerPath} not found in controller paths`);
		}
	}

	public getUpdateOneSchema(controllerPath: string, controllerPaths: TControllerPaths): TSchemaEntity {
		const realControllerPath = `${controllerPath}/{id}`;
		if (realControllerPath in controllerPaths) {
			const ref = controllerPaths[realControllerPath]["patch"]["requestBody"]["content"]["application/json"]["schema"]["$ref"];
			return this.refService.getObjectByJsonRef(ref);
		} else {
			throw new Error(`Path ${realControllerPath} not found in controller paths!`);
		}
	}
}