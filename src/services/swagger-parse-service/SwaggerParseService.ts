import swaggerDoc from "#data/swagger-api.json";
import { APIService } from "./APIService";
import { AvailableCRUDService } from "./AvailableCRUDService";
import { RefService } from "./RefService";
import { SchemaService } from "./SchemaService";
import type {
	TCategoryEntity,
	TAvailableCRUD,
	TSchemaEntity,
} from "./types";


export const SwaggerParseService = new class {

	protected readonly excludePaths: string[] = ["auth"];

	protected readonly refSchemas = "#/components/schemas";

	protected readonly controllerPaths = swaggerDoc.paths;

	protected availableCRUDService: AvailableCRUDService;
	protected schemaService: SchemaService;
	protected refService: RefService;
	protected apiService: APIService;

	constructor() {
		this.availableCRUDService = new AvailableCRUDService();
		this.refService = new RefService(swaggerDoc);
		this.schemaService = new SchemaService(this.refService);
		this.apiService = new APIService(this.controllerPaths);
	}


	public getCategoriesEntity(): TCategoryEntity[] {
		const paths = new Set();
		const tags = new Set();

		Object.keys(swaggerDoc.paths).forEach((path) => {
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

			if ("get" in swaggerDoc.paths[path]) {
				paths.add(controllerPath);
				tags.add(swaggerDoc.paths[path]["get"]["tags"][0]);
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

	public getControlerPathFromArray(path: string[]): string {
		return `/${path.join("/")}`;
	}

	public getAvailableCRUD(pathController: string): TAvailableCRUD {
		return this.availableCRUDService.getAvailableCRUD(pathController, this.controllerPaths);
	}

	public getViewOneSchema(controllerPath: string | string[]): TSchemaEntity {
		if (Array.isArray(controllerPath)) {
			return this.schemaService.getViewOneSchema(
				this.getControlerPathFromArray(controllerPath), this.controllerPaths);
		} else {
			return this.schemaService.getViewOneSchema(controllerPath, this.controllerPaths);
		}
	}

	public getViewManySchema(controllerPath: string | string[]): TSchemaEntity {
		if (Array.isArray(controllerPath)) {
			return this.schemaService.getViewManySchema(
				this.getControlerPathFromArray(controllerPath), this.controllerPaths);
		} else {
			return this.schemaService.getViewManySchema(controllerPath, this.controllerPaths);
		}
	}

	public getCreateOneSchema(controllerPath: string | string[]): TSchemaEntity {
		if (Array.isArray(controllerPath)) {
			return this.schemaService.getCreateOneSchema(
				this.getControlerPathFromArray(controllerPath), this.controllerPaths);
		} else {
			return this.schemaService.getCreateOneSchema(controllerPath, this.controllerPaths);
		}
	}

	public getUpdateOneSchema(controllerPath: string | string[]): TSchemaEntity {
		if (Array.isArray(controllerPath)) {
			return this.schemaService.getUpdateOneSchema(
				this.getControlerPathFromArray(controllerPath), this.controllerPaths);
		} else {
			return this.schemaService.getUpdateOneSchema(controllerPath, this.controllerPaths);
		}
	}

	public get APIService(): APIService {
		return this.apiService;
	}


}