import { Input, InputNumber, Switch } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { HTMLInputTypeAttribute } from "react";

type TOptionProps = {
	type: HTMLInputTypeAttribute
}

export function getFormattedPrimitiveField({
	type,
}: TOptionProps): JSX.Element {
	switch (type) {
		case "number":
			return <InputNumber
				type="number" />;

		case "password":
			return <Input.Password
				type="password" />;

		case "email":
			return <Input
				type="email" />;

		case "text":
			return <Input
				type="text" />;
		case "date":
			return <Input
				type="date" />;

		case "checkbox":
			return <Switch />;

		case "textarea":
			return <Input.TextArea
			showCount
			allowClear
			autoSize={{maxRows: 6}} />

		case "url":
			return <Input
				type="url" />;


		default:
			console.warn(`Неизвестный тип поля: ${type}`);
			return <Input
				type="text" />;
	}
}