import { Link } from "#components/ui/Link";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { getTypeField } from "./getTypeField";

function getFormattedField(type: string, value: any) {
	switch (type) {
		case "number":
		case "password":
		case "email":
		case "text":
			return value.toString();
		case "date":
			return new Date(value).toLocaleString("ru", {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				weekday: 'long',
				timeZone: 'UTC',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			});
		case "checkbox":
			return (
				<input type="checkbox" defaultChecked={!!value} disabled={true} />
			);

		default:
			return value.toString();
	}
}

export function getFormattedEntityValue(entityValue: any, schema: any, CRUDSchema: TSchemaCRUD): any {
	let formattedField = [];

	/**
	 * Форматирование примитивных типов
	 */
	if (schema.type && schema.type !== "array" && schema.type !== "object") {
		const type = getTypeField(schema.type, schema.format);
		formattedField.push(
			<div key={entityValue}>
				{getFormattedField(type, entityValue)}
			</div>
		);
	}
	/**
	 * Форматирование связи many-to-many
	 */
	else if (schema.type === "array") {
		
		if (typeof schema.items !== "object") {
			throw new Error(`Typeof schema.items must be an object, got ${typeof schema.items}`);
		}

		const getControllerPath = (id: string) => CRUDSchema[schema.items.$ref].get.replace("{id}", id);
	
		entityValue.forEach((entityItem, index) => {
			const head = entityItem["head"] || entityItem["title"] || entityItem["name"];
			const id = entityItem["id"];
			
			formattedField.push(
				<Link href={`/entity/view${getControllerPath(id)}`} key={`${getControllerPath(id)}`}>{head}</Link>
			);

			if (index < entityValue.length - 1) {
				formattedField.push(", ");
			}
		});
	}
	/**
	 * Форматирование связи one-to-many, many-to-one, one-to-one
	 * TODO:
	 */
	else if (schema.allOf) {
		const head = entityValue["head"] || entityValue["title"] || entityValue["name"];
		const id = entityValue["id"];
		const controllerPath = CRUDSchema[schema.allOf[0].$ref].get.replace("{id}", id);
		formattedField.push(<Link href={`/entity/view${controllerPath}`} key={controllerPath}>{head}</Link>);
	}

	return formattedField || entityValue.toString();
}



/*
{
	"#/components/schemas/Status": {
		get: {
			one: "/statuses/{id}",
			many: "/statuses"
		},
		patch: "/statuses/{id}",
		delete: "/statuses/{id}",
		post: patch: "/statuses/",
	},
	"#/components/schemas/Status": {
		get: {
			one: "/statuses/{id}",
			many: "/statuses"
		},
		patch: "/statuses/{id}",
		delete: "/statuses/{id}",
		post: patch: "/statuses/",
	},
	...
}
*/