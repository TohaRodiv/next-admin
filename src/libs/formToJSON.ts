import type { TSchemaProperties } from "#services/swagger-parse/types";
import React from "react";

const isCheckboxOrRadio = (type: string): boolean => ["checkbox", "radio"].includes(type);
const isExcludedType = (type: string): boolean => ["button", "submit", "reset"].includes(type);

export function formToJSON(elements: HTMLFormControlsCollection, schemaProps: TSchemaProperties): object {
	const result = {};

	for (const element of elements) {
		const {
			type, name, value, checked, selectedOptions
		} = element as HTMLSelectElement & HTMLInputElement;

		
		let preparedValue = value.trim();

		if (isExcludedType(type)) {
			continue;
		}

		if (["select", "select-multiple",].includes(type) === false && isCheckboxOrRadio(type) === false) {
			if (name in schemaProps) {
				if ("default" in schemaProps[name] && preparedValue == "") {
					preparedValue = schemaProps[name]["default"];
				}
			} else {
				throw new Error(`Field name "${name}" with type ${type} is not defined in schema.`);
			}
		}

		if (isCheckboxOrRadio(type)) {

			result[name] = !!checked;
			
		} else if (type === "select-multiple") {
			result[name] = [];
			for (const option of selectedOptions) {
				result[name].push(isFinite(+option.value) ? +option.value : option.value);
			}

		} else if (preparedValue == "") {
			
			result[name] = preparedValue;

		} else if ((typeof preparedValue === "number" || typeof preparedValue === "string") && isFinite(+preparedValue)) {

			result[name] = +preparedValue;
			
		} else {

			result[name] = preparedValue;
			
		}
	}

	return result;
}