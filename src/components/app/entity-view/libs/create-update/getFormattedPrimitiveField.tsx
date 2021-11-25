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
			return <input
				name={name}
				required={isRequired}
				type="number"
				defaultValue={defaultValue} />;

		case "password":
			return <input
				name={name}
				required={isRequired}
				type="password" />;

		case "email":
			return <input
				name={name}
				required={isRequired}
				type="email" />;

		case "text":
			return <input
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
			return <input
				name={name}
				required={isRequired}
				type="checkbox"
				defaultChecked={!!defaultValue} />;

		case "textarea":
			return <textarea
				name={name}
				required={isRequired}
				defaultValue={defaultValue}>
			</textarea>;

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