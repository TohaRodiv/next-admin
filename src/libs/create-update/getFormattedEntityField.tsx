import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { getBaseFromattedEntityField } from "#libs/getBaseFromattedEntityField";
import { getFormattedPrimitiveField } from "./getFormattedPrimitiveField";
import { getTypeField } from "#libs/getTypeField";
import { TRelations } from "#services/swagger-parse/types";
import { Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { appConfig } from "#config/app-config";

type TOptionProps = {
	defaultValue: any
	schemaKey: string
	schemaValue: object
	CRUDSchema: TSchemaCRUD
	isRequired: boolean
	relations: TRelations
	title: string
	Item: typeof FormItem
}


export function getFormattedEntityField({
	defaultValue,
	schemaKey,
	schemaValue,
	CRUDSchema,
	isRequired,
	relations,
	title,
	Item: FormItem
}: TOptionProps): any {
	return getBaseFromattedEntityField(schemaValue, defaultValue, {

		formatingPrimitive(schemaValue, entityFieldValue) {
			return (

				<FormItem
					initialValue={defaultValue || schemaValue.default || undefined}
					valuePropName={getTypeField(schemaValue.type, schemaValue.format) == "checkbox" ? "checked" : "value"}
					rules={[{
						required: isRequired,
					}]}
					key={schemaKey}
					name={schemaKey}
					label={title}>
					{
						getFormattedPrimitiveField({
							type: getTypeField(schemaValue.type, schemaValue.format),
						})
					}
				</FormItem>

			);
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
								options.push(<Select.Option key={id} value={id}>{title}</Select.Option>);

							})
					}
				});

			const props: any = {};

			if (defaultValue) {
				props.defaultValue = defaultValue.id;
			}

			return (
				<FormItem
					initialValue={defaultValue && defaultValue.id || undefined}
					rules={[{
						required: isRequired,
					}]}
					key={schemaKey}
					name={schemaKey}
					label={title}>
					<Select
						allowClear
						showSearch
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						key={schemaKey}>
						{options}
					</Select>
				</FormItem>
			);
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
								options.push(
									<Select.Option key={id} value={id}>
										{
											schemaKey === "images" ?
												<img src={`${appConfig.API_URL}/${relationEntity["path"]}`} alt={`${title}`} title={`${title}`} width={100} height={100} style={{objectFit: "contain"}} /> :
												title
										}
									</Select.Option>
								);

							})
					}
				});

			const props: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> = {};

			return (
				<FormItem
					initialValue={Array.isArray(defaultValue) ? defaultValue.map(value => value.id) : undefined}
					rules={[{
						required: isRequired,
					}]}
					key={schemaKey}
					name={schemaKey}
					label={title}>
					<Select
						allowClear
						showSearch
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						mode="multiple"
						key={schemaKey}>
						{options}
					</Select>
				</FormItem>
			);
		},

	});
}