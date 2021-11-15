const isCheckboxOrRadio = (type: string): boolean => ["checkbox", "radio"].includes(type);
const isExcludedType = (type: string): boolean => ["button", "submit", "reset"].includes(type);

export function formToJSON(elements: HTMLFormControlsCollection): object {
	const result = {};

	for (const element of elements) {
		const {
			type, name, value, checked
		} = element as React.InputHTMLAttributes<HTMLInputElement>;

		if (isExcludedType(type)) {
			continue;
		}

		result[name] = isCheckboxOrRadio(type) ? !!checked : value;
	}

	return result;
}