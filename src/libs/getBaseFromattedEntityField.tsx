type TFormatOptions = {
	formatingPrimitive?: (schema: any, entityFieldValue: any) => any[]
	formatingManyRelation?: (schema: any, entityFieldValue: any) => any[]
	formatingOneRelation?: (schema: any, entityFieldValue: any) => any[]
}

export function getBaseFromattedEntityField (
	schema: any,
	entityFieldValue: any,
	{
		formatingPrimitive,
		formatingManyRelation,
		formatingOneRelation,
	}: TFormatOptions
): any[] {
	let formattedField = null;

	if (typeof schema === "undefined") {
		throw new Error(`Schema for field value ${entityFieldValue.toString()} is undefined!`);
	}

	/**
	 * Форматирование примитивных типов
	 */
	 if (schema.type && schema.type !== "array" && schema.type !== "object" && formatingPrimitive) {
		formattedField = formatingPrimitive(schema, entityFieldValue);
	}
	/**
	 * Форматирование связи many-to-many
	 */
	else if (schema.type === "array" && formatingManyRelation) {
		formattedField = formatingManyRelation(schema, entityFieldValue);
	}
	/**
	 * Форматирование связи one-to-many, many-to-one, ?one-to-one
	 */
	else if (schema.allOf && formatingOneRelation) {
		formattedField = formatingOneRelation(schema, entityFieldValue);
	}


	return formattedField || entityFieldValue.toString();
}