import { Input, InputNumber } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { HTMLInputTypeAttribute } from "react";

type TOptionProps = {
	type: HTMLInputTypeAttribute
	defaultValue: any
	name: string
	isRequired: boolean
}

export function getFormattedPrimitiveField({
	type,
	defaultValue,
	name,
	isRequired,
}: TOptionProps): JSX.Element {
	switch (type) {
		case "number":
			return <InputNumber
				name={name}
				required={isRequired}
				type="number"
				defaultValue={defaultValue} />;

		case "password":
			return <Input.Password
				name={name}
				required={isRequired}
				type="password" />;

		case "email":
			return <input
				name={name}
				required={isRequired}
				type="email" />;

		case "text":
			return <Input
				name={name}
				required={isRequired}
				type="text"
				defaultValue={defaultValue} />;
		case "date":
			return <input
				name={name}
				required={isRequired}
				type="date"
				defaultValue={defaultValue} />;

		case "checkbox":
			return <Checkbox
				name={name}
				type="checkbox"
				defaultChecked={!!defaultValue} />;

		case "textarea":
			return <Input.TextArea
				name={name}
				required={isRequired}
				defaultValue={defaultValue} />

		case "url":
			return <input
				name={name}
				required={isRequired}
				type="url"
				defaultValue={defaultValue} />;


		default:
			console.warn(`Неизвестный тип поля: ${type}`);
			return <input
				name={name}
				required={isRequired}
				type="text"
				defaultValue={defaultValue} />;
	}
}