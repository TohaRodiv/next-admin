import { TEntity } from "#services/swagger-parse/types";


type TFields = Array<"id" | "name">

export function getStandartFieldsEntity(entity: TEntity, fields: TFields): { [prop: string]: string } {
	const result = {};

	fields.forEach((fieldName) => {
		switch (fieldName) {
			case "id":
				result[fieldName] = entity["id"];
				break;
			case "name":
				result[fieldName] = entity["name"] || entity["title"] || entity["head"];
		}
	});

	return result;
}