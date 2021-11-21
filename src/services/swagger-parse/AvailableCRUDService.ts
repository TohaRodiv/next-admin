import type { TAvailableCRUD, TAvailableCRUDPaths, TControllerPaths } from "./types";

export class AvailableCRUDService {

	public getAvailableCRUD(availableCRUDPaths: TAvailableCRUDPaths, CRUDCategory: string = "entity"): TAvailableCRUD {
		const availableCRUD: TAvailableCRUD = {};

		for (const path in availableCRUDPaths) {
			switch (path) {
				case "getPathGetMany":
					availableCRUD.getPathGetMany = () => this.getManyPath(availableCRUDPaths[path], CRUDCategory);
					break;
				case "getPathGetOne":
					availableCRUD.getPathGetOne = (id: number) => this.getOnePath(availableCRUDPaths[path], id, CRUDCategory);
					break;
				case "getPathUpdateOne":
					availableCRUD.getPathUpdateOne = (id: number) => this.getUpdateOnePath(availableCRUDPaths[path], id, CRUDCategory);
					break;
				case "getPathDeleteOne":
					availableCRUD.getPathDeleteOne = (id: number) => this.getDeleteOnePath(availableCRUDPaths[path], id, CRUDCategory);
					break;
				case "getPathCreateOne":
					availableCRUD.getPathCreateOne = () => this.getCreateOnePath(availableCRUDPaths[path], CRUDCategory);
					break;
			}
		}

		return availableCRUD;
	}

	public getAvailableCRUDPaths(path: string, controllerPaths: TControllerPaths): TAvailableCRUDPaths {
		const result: TAvailableCRUDPaths = {};
		/**
		 * Find get many operation
		 */
		if (this.isIncludeMethodInController(path, "get", controllerPaths)) {
			result.getPathGetOne = path;
		}

		/**
		 * Find get one operation
		 */
		if (this.isIncludeMethodInController(`${path}/{id}`, "get", controllerPaths)) {
			result.getPathGetOne = path;
		}

		/**
		 * Find update one operation
		 */
		 if (this.isIncludeMethodInController(`${path}/{id}`, "patch", controllerPaths)) {
			result.getPathUpdateOne = path;
		 }

		/**
		 * Find delete one operation
		 */
		if (this.isIncludeMethodInController(`${path}/{id}`, "delete", controllerPaths)) {
			result.getPathDeleteOne = path;
		}

		/**
		 * Find create one operation
		 */
		if (this.isIncludeMethodInController(`${path}`, "post", controllerPaths)) {
			result.getPathCreateOne = path;
		}

		return result;
	}

	protected isIncludeMethodInController (path: string, method: string, controllerPaths: any): boolean {
		return controllerPaths[path] && method in controllerPaths[path];
	}

	protected getManyPath (path: string, CRUDCategory: string = "entity"): string {
		return `/${CRUDCategory}${path}`;
	}

	protected getOnePath (path: string, id: number, CRUDCategory: string = "entity"): string {
		return `/${CRUDCategory}/view${path}/${id}`;
	}

	protected getUpdateOnePath (path: string, id: number, CRUDCategory: string = "entity"): string {
		return `/${CRUDCategory}/edit${path}/${id}`;
	}

	protected getDeleteOnePath (path: string, id: number, CRUDCategory: string = "entity"): string {
		return `/${CRUDCategory}/delete${path}/${id}`;
	}

	protected getCreateOnePath (path: string, CRUDCategory: string = "entity"): string {
		return `/${CRUDCategory}/create${path}`;
	}
}