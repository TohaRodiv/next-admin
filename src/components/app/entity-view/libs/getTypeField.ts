import { HTMLInputTypeAttribute } from "react";

export function getTypeField (type: string, format: string): HTMLInputTypeAttribute {
	switch (type) {
		case "string":
			switch (format) {
				case "date":
				case "date-time":
					return "date";

				case "password":
					return "password";

				case "email":
					return "email";
					
				default:
					return "text";
			}
		
		case "number":
		case "integer":
			return "number";
		
		case "boolean":
			return "checkbox";
		
		/**
		 * TODO: Change returned type to "select"
		 */
		case "array":
			return "text";
		
		default:
			throw new Error(`Unknown type ${type}`);
	}
}