export type TDataFieldsValue = {
	field: string
	getFormattedValue?: (entityValue: any) => any
}

export type TDataFields = {
	id?: TDataFieldsValue
	title?: TDataFieldsValue
	subtitle?: TDataFieldsValue
	[propName: string]: TDataFieldsValue
}