import { TFieldsSchema } from "#libs/swagger-doc-parser/types";
import { Form } from "antd";
import { Rule } from "antd/lib/form";
import { FC } from "react";
import { renderField } from "./renderField";

type TProps = {
	schema: TFieldsSchema
};

const CreateEntityForm: FC<TProps> = ({
	schema,
}) => {
	return (
		<Form name="create-entity" autoComplete="off" layout="vertical">
			{
				Object
					.entries(schema)
					.map(([fieldName, props]) => {
						const {
							type, title, defaultValue, deprecated, maxLength, minLength,
							pattern, readOnly, writeOnly, required, items,
						} = props;

						const rules: Rule = {
							required,
						};

						if (!!minLength) {
							rules.min = minLength;
						}

						if (!!maxLength) {
							rules.max = maxLength;
						}

						if (!!pattern) {
							rules.pattern = pattern;
						}

						return (
							<Form.Item
								rules={[rules]}
								label={title}
								name={fieldName}>
								{renderField({ type, defaultValue, readOnly, writeOnly, items })}
							</Form.Item>
						);
					})
			}
		</Form>
	);
};

export {
	CreateEntityForm
};