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
				
				case "text":
					return "textarea";
				
				case "url":
				case "uri":
					return "url";
					
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
			return "text";
			/**
			 * TODO:
			 */
			throw new Error(`Unknown type ${type}`);
	}
}