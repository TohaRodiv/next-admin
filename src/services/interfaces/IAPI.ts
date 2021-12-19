import { TControllerPaths } from "#services/swagger-parse/types";
import { TTokens } from "#types/TTokens";

export interface IAPI {
	getMany(controllerPath: TControllerPaths): Promise<any>

	getById(controllerPath: TControllerPaths, id: number): Promise<any>

	updateById(controllerPath: TControllerPaths, id: number, data: object): Promise<any>

	createOne(controllerPath: TControllerPaths, data: object): Promise<any>

	deleteById(controllerPath: TControllerPaths, id: number): Promise<any>
}

export interface IServerAPI {
	getMany(controllerPath: TControllerPaths, tokens: TTokens): Promise<any>

	getById(controllerPath: TControllerPaths, id: number, tokens: TTokens): Promise<any>

	updateById(controllerPath: TControllerPaths, id: number, data: object, tokens: TTokens): Promise<any>

	createOne(controllerPath: TControllerPaths, data: object, tokens: TTokens): Promise<any>

	deleteById(controllerPath: TControllerPaths, id: number, tokens: TTokens): Promise<any>
}