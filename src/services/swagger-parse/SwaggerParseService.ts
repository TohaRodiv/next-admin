import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { APIService } from "./APIService";
import { AvailableCRUDService } from "./AvailableCRUDService";
import { RefService } from "./RefService";
import { SchemaService } from "./SchemaService";

import swaggerDocs from "#config/api-json.json";

import type {
	TCategoryEntity,
	TAvailableCRUD,
	TSchemaEntity,
	TControllerPaths,
	TAvailableCRUDPaths,
	TRelations,
} from "./types";


export const SwaggerParseService = new class {

	protected readonly excludePaths: string[] = ["auth"];

	protected readonly refSchemas = "#/components/schemas";

	protected availableCRUDService: AvailableCRUDService;
	protected schemaService: SchemaService;
	protected refService: RefService;
	protected apiService: APIService;

	constructor() {
		this.availableCRUDService = new AvailableCRUDService();
		this.refService = new RefService(this.getSwaggerDoc);
		this.schemaService = new SchemaService(this.refService);
		this.apiService = new APIService(this.getControllerPaths);
	}


	public async getCategoriesEntity(): Promise<TCategoryEntity[]> {
		const paths = new Set();
		const tags = new Set();
		const controllerPaths = await this.getControllerPaths();

		Object.keys(controllerPaths).forEach((path) => {
			const controllerPath = path.replace(/\/({id}|bulk)$/, "");

			const isExcluded = this.excludePaths
				.map(excludePath => {
					const splitPaths = path.split("/");
					splitPaths.shift();
					return splitPaths.includes(excludePath);
				})
				.filter(isExcluded => isExcluded === true)
				.length > 0;

			if (isExcluded) {
				return;
			}

			if ("get" in controllerPaths[path]) {
				paths.add(controllerPath);
				tags.add(controllerPaths[path]["get"]["tags"][0]);
			}
		});

		const pathList = Array.from(paths);
		const tagList = Array.from(tags);

		if (pathList.length !== tagList.length) {
			throw new Error("Tags and path length not equal.");
		}

		return pathList.map((path: string, index) => ({
			path,
			title: tagList[index] as string,
		}));
	}

	public async getSchemaCRUD(): Promise<TSchemaCRUD> {
		const result: TSchemaCRUD = {};

		const controllerPaths = await this.getControllerPaths();

		Object.entries(controllerPaths).forEach(([controllerPath, controllerMethods]) => {
			Object.entries(controllerMethods).forEach(([method, methodBody]) => {
				if (
					"200" in methodBody["responses"]
					&& "content" in methodBody["responses"]["200"]
					&& methodBody["responses"]["200"]["content"]["application/json"]["schema"]["$ref"]
				) {
					const ref = methodBody["responses"]["200"]["content"]["application/json"]["schema"]["$ref"];
					if (result[ref]) {
						result[ref][method] = controllerPath;
					} else {
						result[ref] = {};
						result[ref][method] = controllerPath;
					}
				}
			});
		});


		return result;
	}

	public getControlerPathFromArray(path: string[]): string {
		return `/${path.join("/")}`;
	}

	/**
	 * @description ???????????????????????? ???? ?????????????????? ??????????.
	 * @return ???????????????????? ???????????? ?? ???????????? ?????? CRUD ????????????????.
	 */
	public async getAvailableCRUDPaths(pathController: string): Promise<TAvailableCRUDPaths> {
		return this.availableCRUDService.getAvailableCRUDPaths(pathController, await this.getControllerPaths());
	}

	/**
	 * @description ???????????????????????? ???? ??????????????.
	 * @return ???????????????????? ???????????? ?? ?????????????????? ???????????????????????? CRUD ????????????????.
	 */
	public getAvailableCRUD(availableCRUDPaths: TAvailableCRUDPaths, CRUDCategory: string = "entity"): TAvailableCRUD {
		return this.availableCRUDService.getAvailableCRUD(availableCRUDPaths, CRUDCategory);
	}

	/**
	 * TODO:
	 * @param controllerPath 
	 * @returns 
	 */
	public async getViewOneSchema(controllerPath: string | string[]): Promise<TSchemaEntity> {
		if (Array.isArray(controllerPath)) {
			return await this.schemaService.getViewOneSchema(
				this.getControlerPathFromArray(controllerPath), await this.getControllerPaths());
		} else {
			return this.schemaService.getViewOneSchema(controllerPath, await this.getControllerPaths());
		}
	}

	/**
	 * TODO:
	 * @param controllerPath 
	 * @returns 
	 */
	public async getViewManySchema(controllerPath: string | string[]): Promise<TSchemaEntity> {
		if (Array.isArray(controllerPath)) {
			return await this.schemaService.getViewManySchema(
				this.getControlerPathFromArray(controllerPath), await this.getControllerPaths());
		} else {
			return this.schemaService.getViewManySchema(controllerPath, await this.getControllerPaths());
		}
	}

	/**
	 * TODO:
	 * @param controllerPath 
	 * @returns 
	 */
	public async getCreateOneSchema(controllerPath: string | string[]): Promise<TSchemaEntity> {
		if (Array.isArray(controllerPath)) {
			return this.schemaService.getCreateOneSchema(
				this.getControlerPathFromArray(controllerPath), await this.getControllerPaths()
			);
		} else {
			return this.schemaService.getCreateOneSchema(controllerPath, await this.getControllerPaths());
		}
	}

	/**
	 * TODO:
	 * @param controllerPath 
	 * @returns 
	 */
	public async getUpdateOneSchema(controllerPath: string | string[]): Promise<TSchemaEntity> {
		if (Array.isArray(controllerPath)) {
			return this.schemaService.getUpdateOneSchema(
				this.getControlerPathFromArray(controllerPath), await this.getControllerPaths());
		} else {
			return this.schemaService.getUpdateOneSchema(controllerPath, await this.getControllerPaths());
		}
	}

	public get APIService(): APIService {
		return this.apiService;
	}

	public async getRelations(schema: TSchemaEntity): Promise<TRelations> {

		const CRUDSchemas = await this.getSchemaCRUD();

		const relations = Object
			.entries(schema.properties)
			.filter(([, prop]) => "allOf" in prop || (prop.type === "array" && "items" in prop))
			.map(async ([propName, propValue]) => {
				if ("allOf" in propValue) {
					const ref = propValue["allOf"][0]["$ref"];
					const controllerPath = CRUDSchemas[ref].get.replace("/{id}", "");
					const response = await this.APIService.getMany(controllerPath);
					const relations = await response.json();
					return {
						[propName]: relations,
					};
				} else if ((propValue.type === "array" && "items" in propValue)) {
					if (propValue["items"]["type"] === "string") {
						throw new Error(`$ref is required!`);
					}
					const ref = propValue["items"]["$ref"];
					const controllerPath = CRUDSchemas[ref].get.replace("/{id}", "");
					const response = await this.APIService.getMany(controllerPath);
					const relations = await response.json();
					return {
						[propName]: relations,
					};
				} else {
					console.log(`Relation not found for property ${propName}`);
					return null;
				}
			});

			return Promise.all(relations);
	}

	protected async getSwaggerDoc(): Promise<any> {
		// const response = await fetch(`${process.env.LOCAL_API_URL}/api/swagger-docs`);
		// const data = await response.json();
		return swaggerDocs;
	}

	/**
	 * TODO:
	 */
	protected async getControllerPaths(): Promise<TControllerPaths> {
		if (typeof this["_controllerPaths"] === "undefined") {
			// const response = await fetch(`${process.env.LOCAL_API_URL}/api/swagger-docs`);
			// const data = await response.json();
			this["_controllerPaths"] = swaggerDocs.paths;
			return swaggerDocs.paths;
		} else {
			return this["_controllerPaths"];
		}
	}
}