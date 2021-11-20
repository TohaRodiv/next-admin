import { HTMLInputTypeAttribute } from "react";

type TOptionProps = {
	type: HTMLInputTypeAttribute
	defaultValue: string | number | Date | boolean
	name: string
	isRequired: boolean
}

export function getFormattedPrimitiveField({
	type,
	defaultValue,
	name,
	isRequired,
}) {
	switch (type) {
		case "number":
			return <input name={name} required={isRequired} type="number" defaultValue={defaultValue} />
		case "password":
			return <input name={name} required={isRequired} type="password" />
		case "email":
			return <input name={name} required={isRequired} type="email" defaultValue={defaultValue} />
		case "text":
			return <input name={name} required={isRequired} type="text" defaultValue={defaultValue} />;
		case "date":
			return <input name={name} required={isRequired} type="date" defaultValue={defaultValue} />
		case "checkbox":
			return <input name={name} required={isRequired} type="checkbox" defaultChecked={!!defaultValue} />;

		default:
			console.warn(`Неизвестный тип поля: ${type}`);
			return <input name={name} required={isRequired} type="text" defaultValue={defaultValue} />;
	}
}