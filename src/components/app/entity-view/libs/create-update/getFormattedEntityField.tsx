import { Link } from "#components/ui/Link";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { getBaseFromattedEntityField } from "../getBaseFromattedEntityField";
import { getFormattedPrimitiveField } from "./getFormattedPrimitiveField";
import { getTypeField } from "../getTypeField";
import { TRelations } from "#services/swagger-parse/types";

type TOptionProps = {
	defaultValue: any
	schemaKey: string
	schemaValue: object
	CRUDSchema: TSchemaCRUD
	isRequired: boolean
	relations: TRelations
}


export function getFormattedEntityField({ defaultValue, schemaKey, schemaValue, CRUDSchema, isRequired, relations, }: TOptionProps): any {
	return getBaseFromattedEntityField(schemaValue, defaultValue, {
		formatingPrimitive(schemaValue, entityFieldValue) {
			const type = getTypeField(schemaValue.type, schemaValue.format);

			return [
				<div key={type}>
					{getFormattedPrimitiveField({
						name: schemaKey,
						type,
						defaultValue,
						isRequired,
					})}
				</div>
			];
		},
		formatingOneRelation(schemaValue, entityValue) {
			const options = [];

			Object
				.values(relations)
				.forEach(relation => {
					if (relation[schemaKey]) {
						const relationCurrentEntity = relation[schemaKey];
						relationCurrentEntity
							.forEach(relationEntity => {
								const id = relationEntity["id"];
								const title = relationEntity["name"] || relationEntity["title"] || relationEntity["head"] || relationEntity["id"];
								options.push(<option key={id} value={id}>{title}</option>);

							})
					}
				});

			const props: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> = {};

			if (defaultValue) {
				props.defaultValue = defaultValue.id;
			}

			return [
				<select key={schemaKey} name={schemaKey} required={isRequired} {...props}>
					{options}
				</select>
			];
		},
		formatingManyRelation(schemaValue, entityValue) {
			if (typeof schemaValue.items !== "object") {
				throw new Error(`Typeof schema.items must be an object, got ${typeof schemaValue.items}`);
			}

			const options = [];

			Object
				.values(relations)
				.forEach(relation => {
					if (relation[schemaKey]) {
						const relationCurrentEntity = relation[schemaKey];
						relationCurrentEntity
							.forEach(relationEntity => {
								const id = relationEntity["id"];
								const title = relationEntity["name"] || relationEntity["title"] || relationEntity["head"] || relationEntity["id"];
								options.push(<option key={id} value={id}>{title}</option>);

							})
					}
				});

			const props: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> = {};

			if (defaultValue) {
				props.defaultValue = defaultValue.map(value => value.id);
			}

			return [
				<select key={schemaKey} name={schemaKey} required={isRequired} multiple={true} {...props}>
					{options}
				</select>
			];
		},
	});
}