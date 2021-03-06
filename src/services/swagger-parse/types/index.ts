export type TSchemaProperties = {
	[propName: string]: {
		default: any
		type: string
		title?: string
		format?: string
		allOf?: {
			$ref: string
		}[]
	}
}

export type TSchemaEntity = {
	type: string
	properties: TSchemaProperties
	required: string[]
}

export type TCategoryEntity = {
	title: string
	path: string
}

export type TAvailableCRUD = {
	getPathGetMany?: () => string
	getPathGetOne?: (id: number) => string
	getPathUpdateOne?: (id: number) => string
	getPathDeleteOne?: (id: number) => string
	getPathCreateOne?: () => string
}

export type TAvailableCRUDPaths = {
	getPathGetMany?: string
	getPathGetOne?: string
	getPathUpdateOne?: string
	getPathDeleteOne?: string
	getPathCreateOne?: string
}

export type TEntity = {
	[propName: string]: any
}

export type TControllerPaths = any

export type TRelations = Array<{
	[propName: string]: {
		[propName: string]: any
	}
}>