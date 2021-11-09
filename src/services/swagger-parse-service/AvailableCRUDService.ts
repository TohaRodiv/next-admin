import type { TAvailableCRUD, TControllerPaths } from "./types";

export class AvailableCRUDService {
	public getAvailableCRUD(path: string, controllerPatsh: TControllerPaths): TAvailableCRUD {
		const result: TAvailableCRUD = {};
		/**
		 * Find get many operation
		 */
		if (this.isIncludeMethodInController(path, "get", controllerPatsh)) {
			result.getPathGetOne = () => this.getManyPath(path);
		}

		/**
		 * Find get one operation
		 */
		if (this.isIncludeMethodInController(`${path}/{id}`, "get", controllerPatsh)) {
			result.getPathGetOne = (id: number) => this.getOnePath(path, id);
		}

		/**
		 * Find update one operation
		 */
		 if (this.isIncludeMethodInController(`${path}/{id}`, "patch", controllerPatsh)) {
			result.getPathUpdateOne = (id: number) => this.getUpdateOnePath(path, id);
		 }

		/**
		 * Find delete one operation
		 */
		if (this.isIncludeMethodInController(`${path}/{id}`, "delete", controllerPatsh)) {
			result.getPathDeleteOne = (id: number) => this.getDeleteOnePath(path, id);
		}

		/**
		 * Find create one operation
		 */
		if (this.isIncludeMethodInController(`${path}`, "post", controllerPatsh)) {
			result.getPathCreateOne = () => this.getCreateOnePath(path);
		}

		return result;
	}

	protected isIncludeMethodInController (path: string, method: string, controllerPatsh: any): boolean {
		return controllerPatsh[path] && method in controllerPatsh[path];
	}

	protected getManyPath (path: string): string {
		return `/entity/${path}`;
	}

	protected getOnePath (path: string, id: number): string {
		return `/entity/view${path}/${id}`;
	}

	protected getUpdateOnePath (path: string, id: number): string {
		return `/entity/edit${path}/${id}`;
	}

	protected getDeleteOnePath (path: string, id: number): string {
		return `/entity/delete${path}/${id}`;
	}

	protected getCreateOnePath (path: string): string {
		return `/entity/create${path}`;
	}
}