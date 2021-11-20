import React from "react";

const isCheckboxOrRadio = (type: string): boolean => ["checkbox", "radio"].includes(type);
const isExcludedType = (type: string): boolean => ["button", "submit", "reset"].includes(type);

export function formToJSON(elements: HTMLFormControlsCollection): object {
	const result = {};

	for (const element of elements) {
		const {
			type, name, value, checked, selectedOptions
		} = element as HTMLSelectElement & HTMLInputElement;

		if (isExcludedType(type)) {
			continue;
		}

		if (isCheckboxOrRadio(type)) {

			result[name] = !!checked;
			
		} else if (type === "select-multiple") {
			result[name] = [];
			for (const option of selectedOptions) {
				result[name].push(isFinite(+option.value) ? +option.value : option.value);
			}

		} else if (isFinite(+value)) {

			result[name] = +value;
			
		} else {

			result[name] = value;
			
		}
	}

	return result;
}