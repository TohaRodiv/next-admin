import type { TSchemaEntity } from "./types";

export class RefService {
	constructor(
		protected getSwaggerDoc: () => Promise<any>,
	) {}

	public async getObjectByJsonRef(ref: string): Promise<TSchemaEntity> {
		const arrRef = ref.split("/");
		arrRef.shift();

		return arrRef.reduce((prev, current, index, refs) => {
			if (typeof prev[refs[index]] !== "undefined") {
				return prev[refs[index]];
			} else {
				throw new Error(`Ref ${ref} not found`);
			}
		}, await this.getSwaggerDoc());
	}
}