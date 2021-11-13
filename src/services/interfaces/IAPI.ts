import { TControllerPaths } from "#services/swagger-parse/types";

export interface IAPI {
	getMany(controllerPath: TControllerPaths): Promise<any[]>

	getById(controllerPath: TControllerPaths, id: number): Promise<any>

	updateById(controllerPath: TControllerPaths, id: number, data: BodyInit): Promise<any>

	createOne(controllerPath: TControllerPaths, data: BodyInit): Promise<any>

	deleteById(controllerPath: TControllerPaths, id: number): Promise<any>
}