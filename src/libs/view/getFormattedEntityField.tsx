import { Link } from "#components/atoms/Link";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { getBaseFromattedEntityField } from "#libs/getBaseFromattedEntityField";
import { getFormattedField } from "./getFormattedPrimitiveField";
import { getTypeField } from "#libs/getTypeField";
import { appConfig } from "#config/app-config";


export function getFormattedEntityField(entityValue: any, schema: any, CRUDSchema: TSchemaCRUD): any {

	return getBaseFromattedEntityField(schema, entityValue, {
		formatingPrimitive(schema, entityFieldValue) {
			const type = getTypeField(schema.type, schema.format);
			return [
				<div key={entityValue}>
					{getFormattedField(type, entityValue)}
				</div>
			];
		},
		formatingOneRelation(schema, entityValue) {
			if (!entityValue) {
				return ["NULL"];
			}

			const id = entityValue["id"];
			const head = entityValue["head"] || entityValue["title"] || entityValue["name"] || entityValue["id"];
			const controllerPath = CRUDSchema[schema.allOf[0].$ref].get.replace("{id}", id);
			return [<Link href={`/entity/view${controllerPath}`} key={controllerPath}>{head}</Link>];
		},
		formatingManyRelation(schema, entityValue) {

			if (typeof schema.items !== "object") {
				throw new Error(`Typeof schema.items must be an object, got ${typeof schema.items}`);
			}

			const getControllerPath = (id: string) => CRUDSchema[schema.items.$ref].get.replace("{id}", id);
			let formattedField = [];

			if (entityValue && "length" in entityValue && entityValue.length < 1) {
				return ["NULL"];
			}

			entityValue.forEach((entityItem, index) => {
				const id = entityItem["id"];
				const head = entityItem["head"] || entityItem["title"] || entityItem["name"] || entityItem["id"];

				formattedField.push(
					<Link href={`/entity/view${getControllerPath(id)}`} key={`${getControllerPath(id)}`}>
						{
							"mimetype" in entityItem && entityItem["path"] ?
								<img src={`${appConfig.API_URL}/${entityItem["path"]}`} alt={head} title={head} /> :
								head
						}
					</Link>
				);

				if (index < entityValue.length - 1) {
					formattedField.push(", ");
				}
			});

			return formattedField;
		},
	});
}