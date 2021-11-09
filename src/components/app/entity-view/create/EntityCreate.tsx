import { Button } from "#components/ui/Button";
import { TSchemaEntity } from "#services/swagger-parse-service/types";
import { HTMLInputTypeAttribute } from "react";
import { BackButton } from "../../button-back";
import { getTypeField } from "../libs/getTypeField";


type TProps = {
	schema: TSchemaEntity
}

export const EntityCreate: React.FC <TProps> = ({ schema, }): JSX.Element => {
	const { properties: schemaProps } = schema;
	return (
		<div className="entity-view">
			{
				Object.keys(schemaProps).map((schemaKey) => {
					let title = schemaProps[schemaKey]["title"] ? schemaProps[schemaKey]["title"] : schemaKey;
					console.log("Type:", schemaProps[schemaKey]["type"]);
					let type: HTMLInputTypeAttribute = getTypeField(schemaProps[schemaKey]["type"], schemaProps[schemaKey]["format"]);

					return (
						<div className="entity-view__item" key={schemaKey}>
							<div className="entity-view__title">{title}</div>
							<div className="entity-view__value">
								<input type={type} />
							</div>
						</div>
					);
				})
			}
			<Button>Сохранить</Button>
			<BackButton value="Отменить" />
		</div>
	);
};