import { TEndpoint, TEndpointPaths, TFieldsSchema, TFieldType, TMethodsSchema } from "./types";
import SwaggerDoc from "./../../../data/api-json.json";

type TGetCRUDMethod = {
    currentPath: {
        get?: any,
        post?: any,
        patch?: any,
        delete?: any,
    },
    endpointMethod: any,
    method: "create" | "findById" | "findAll" | "update" | "delete",
    swaggerDoc: any,
};

type TGetEntityType = {
    type: string,
    format?: string,
    allOf?: any[],
}

type TCallbackforEachByPath = {
    path: string,
    endpointId: number,
    controllerPath: string,
}

export const SwaggerDocParser = new class {

    public async getEndpoints(): Promise<TEndpoint[]> {
        const endpoints: TEndpoint[] = [];
        const paths = await this.getEndpointPaths();
        const endpointMethods: { [controllerPath: string]: TMethodsSchema } = {};
        let lastControllerPath: null | string = Object.keys(paths)[0].replace(/\/({id}|bulk)$/, "");
        const swaggerDoc = await this.getSwaggerDoc();

        /**
         * Логика, отвечающая за формирование CRUD-методов
         */
        await this.forEachByPath(async ({
            path,
            controllerPath,
        }) => {
            if (lastControllerPath != controllerPath) {
                lastControllerPath = controllerPath;
            }

            if (lastControllerPath == controllerPath) {

                if (/bulk$/.test(path)) {
                    // todo
                } else if (/\{id\}$/.test(path)) {

                    endpointMethods[controllerPath] = this.getCRUDMethod({
                        currentPath: paths[path],
                        endpointMethod: endpointMethods[controllerPath],
                        method: "findById",
                        swaggerDoc,
                    });

                    endpointMethods[controllerPath] = this.getCRUDMethod({
                        currentPath: paths[path],
                        endpointMethod: endpointMethods[controllerPath],
                        method: "update",
                        swaggerDoc,
                    });


                } else {

                    endpointMethods[controllerPath] = this.getCRUDMethod({
                        currentPath: paths[path],
                        endpointMethod: endpointMethods[controllerPath],
                        method: "findAll",
                        swaggerDoc,
                    });

                    endpointMethods[controllerPath] = this.getCRUDMethod({
                        currentPath: paths[path],
                        endpointMethod: endpointMethods[controllerPath],
                        method: "create",
                        swaggerDoc,
                    });

                }
            }

        });
        /**
         * Логика, отвечающая за формирование массива объектов точек доступа API
         */
        await this.forEachByPath(async ({
            path,
            controllerPath,
            endpointId,
        }) => {
            if ("get" in paths[path]) {
                const issetCurrentPath = endpoints.filter((endpoint) => endpoint.path == controllerPath).length > 0;
                const methods = endpointMethods[controllerPath];

                if (!issetCurrentPath) {
                    endpoints.push({
                        id: endpointId + 1,
                        methods: methods,
                        path: controllerPath,
                        title: Object.values(paths[path]).map((values: any) => values.tags[0])[0],
                    });
                }
            }

        });

        return endpoints;
    }

    public async getEndpointByPath(entityPath: string): Promise<TEndpoint | null> {
        return (await this.getEndpoints()).filter(endpoint => endpoint.path == entityPath)[0] || null;
    }

    private readonly excludePaths: string[] = ["auth", "files"];

    private async getSwaggerDoc(): Promise<typeof SwaggerDoc> {
        return SwaggerDoc;
    }

    private getObjectByJsonRef(ref: string, SwaggerDoc: any): any {
        const arrRef = ref.split("/");
        arrRef.shift();

        return arrRef.reduce((prev: any, current, index, refs) => {
            if (typeof prev[refs[index]] !== "undefined") {
                return prev[refs[index]];
            } else {
                throw new Error(`Ref ${ref} not found`);
            }
        }, SwaggerDoc);
    }

    private isExcludedPath(path: string): boolean {
        return this.excludePaths
            .map(excludePath => {
                const splitPaths = path.split("/");
                splitPaths.shift();
                return splitPaths.includes(excludePath);
            })
            .filter(isExcluded => isExcluded === true)
            .length > 0;

    }

    private async forEachByPath(callback: (callbackParams: TCallbackforEachByPath) => Promise<void>): Promise<void> {
        const paths = await this.getEndpointPaths();

        Object
            .keys(paths)
            .forEach(async (path: string, endpointId: number): Promise<void> => {
                const controllerPath = path.replace(/\/({id}|bulk)$/, "");

                if (this.isExcludedPath(path)) {
                    return;
                }

                callback({
                    path,
                    endpointId,
                    controllerPath,
                });
            });
    }

    private async getEndpointPaths(): Promise<TEndpointPaths> {
        return (await this.getSwaggerDoc()).paths;
    }

    private getCRUDMethod({
        currentPath,
        endpointMethod,
        method,
        swaggerDoc,
    }: TGetCRUDMethod): any {
        const methodsParts = {
            [method]: {
                schema: {},
            },
        };
        let refEntity = null;

        switch (method) {
            case "create":
                refEntity = currentPath["post"] ? currentPath["post"]["requestBody"]["content"]["application/json"]["schema"]["$ref"] : null;
                break;
            case "findAll":
                refEntity = currentPath["get"] ? currentPath["get"]["responses"]["200"]["content"]["application/json"]["schema"]["oneOf"][1]["items"]["$ref"] : null;
                break;
            case "findById":
                refEntity = currentPath["get"] ? currentPath["get"]["responses"]["200"]["content"]["application/json"]["schema"]["$ref"] : null;
                break;
            case "update":
                refEntity = currentPath["patch"] ? currentPath["patch"]["requestBody"]["content"]["application/json"]["schema"]["$ref"] : null;
                break;
            case "delete":
                refEntity = null;
                break;

            default:
                throw new Error("Method not implemented!");
        }

        const fieldsSchema = refEntity ? this.getObjectByJsonRef(refEntity, swaggerDoc) : null;

        if (fieldsSchema === null) {
            delete methodsParts[method];
        } else {
            methodsParts[method].schema = this.getFieldsSchema(fieldsSchema);
        }

        if (endpointMethod) {
            return {
                ...endpointMethod,
                ...methodsParts,
            };
        } else {
            return methodsParts;
        }
    }

    private getFieldsSchema(entity: any): TFieldsSchema {
        const result: TFieldsSchema = {};

            Object
            .entries(entity.properties)
            .forEach(([fieldName, props]: [string, any]) => {
                
                const type = this.getEntityType({
                    type: props.type,
                    format: props.format,
                    allOf: props.allOf,
                });

                result[fieldName] =  {
                    type,
                    title: props.title              || fieldName,
                    minLength: props.minLength      || null,
                    maxLength: props.maxLength      || null,
                    defaultValue: props.default     || null,
                    pattern: props.pattern          || null,
                    readOnly: props.readOnly        || false,
                    writeOnly: props.writeOnly      || false,
                    deprecated: props.deprecated    || false,
                    required: Array.isArray(entity.required) ? entity.required.includes(fieldName) : false,
                };
            });

        return result;
    }

    private getEntityType({
        type,
        format,
        allOf,
    }: TGetEntityType): TFieldType {

        if (type == "number" || type == "integer") {
            return "number";
        } else if (type == "string") {
            if (format == "date") {
                return "date";
            } else if (format == "date-time") {
                return "datetime";
            } else if (format == "password") {
                return "password";
            } else if (format == "byte") {
                return "byte";
            } else if (format == "binary") {
                return "binary";
            }
        } else if (type == "boolean") {
            return "boolean";
        } else if (Array.isArray(allOf)) {
            return "select";
        } else if (type == "array") {
            return "multiple";
        }

        return "text";
    }
}