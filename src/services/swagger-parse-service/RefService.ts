import type { TSchemaEntity } from "./types";

export class RefService {
	constructor(
		protected swaggerDoc: object,
	) {}

	public getObjectByJsonRef(ref: string): TSchemaEntity {
		const arrRef = ref.split("/");
		arrRef.shift();

		return arrRef.reduce((prev, current, index, refs) => {
			if (typeof prev[refs[index]] !== "undefined") {
				return prev[refs[index]];
			} else {
				throw new Error(`Ref ${ref} not found`);
			}
		}, this.swaggerDoc);
	}
}