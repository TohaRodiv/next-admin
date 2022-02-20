import { TFieldType } from "#libs/swagger-doc-parser/types";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Input, Switch } from "antd";

export function renderField({
	type, defaultValue, readOnly, writeOnly, items,
}: { type: TFieldType, defaultValue: any, readOnly: boolean, writeOnly: boolean, items: any[] }) {

	const sharedProps = {
		readOnly: !!readOnly,
		defaultValue,
	};

	const textProps = {
		allowClear: true,
		showCount: true,
	}

	if (type == "number") {
		return <Input type="number" {...sharedProps} />
	} else if (type == "email") {
		return <Input type="email" {...sharedProps} />
	} else if (type == "tel") {
		return <Input type="tel" {...sharedProps} />
	} else if (type == "string") {
		return <Input type="text" {...sharedProps} {...textProps} />
	} else if (type == "text") {
		return <Input.TextArea {...sharedProps} {...textProps} />
	} else if (type == "password") {
		return <Input.Password {...sharedProps} />
	} else if (type == "date") {
		// return  <Calendar fullscreen={false} />
		return <Input type="date" {...sharedProps} />
	} else if (type == "datetime") {
		// return  <Calendar fullscreen={false} />
		return <Input type="datetime-local" {...sharedProps} />
	} else if (type == "boolean") {
		return <Switch
			defaultChecked={!!defaultValue}
			disabled={!!readOnly}
			checkedChildren={<CheckOutlined />}
			unCheckedChildren={<CloseOutlined />} />
	}
}