export type TSchemaCRUD = {
	[schemaPath: string]: {
		post?: string
		get?: string
		patch?: string
		delete?: string
	}
}