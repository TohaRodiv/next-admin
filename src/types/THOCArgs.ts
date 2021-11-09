export type THOCArgs = {
	handlers?: {
		[handlerName: string]: CallableFunction
	}
	data?: {
		[propName: string]: any
	}
}