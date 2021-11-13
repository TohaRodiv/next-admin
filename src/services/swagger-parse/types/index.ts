export type TSchemaEntity = {
	type: string
	properties: {
		[propName: string]: {
			type: string
			title?: string
			format?: string
		}
	}
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