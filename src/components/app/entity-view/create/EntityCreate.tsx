import { Button } from "#components/ui/Button";
import { TSchemaEntity } from "#services/swagger-parse-service/types";
import React, { FormEvent, HTMLInputTypeAttribute, SyntheticEvent } from "react";
import { BackButton } from "../../button-back";
import { getTypeField } from "../libs/getTypeField";
import FormDataJson from "form-data-json-convert";


type TProps = {
	schema: TSchemaEntity
}

export const EntityCreate: React.FC <TProps> = ({ schema, }): JSX.Element => {
	const { properties: schemaProps } = schema;

	const handleSubmit = (event: SyntheticEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const target = event.currentTarget;
		const payload = FormDataJson.toJson(target);
		console.log(payload);
	};

	return (
		<form action="" method="POST" onSubmit={handleSubmit} className="entity-view">
			{
				Object.keys(schemaProps).map((schemaKey) => {
					let title = schemaProps[schemaKey]["title"] ? schemaProps[schemaKey]["title"] : schemaKey;
					console.log("Type:", schemaProps[schemaKey]["type"]);
					let type: HTMLInputTypeAttribute = getTypeField(schemaProps[schemaKey]["type"], schemaProps[schemaKey]["format"]);

					return (
						<div className="entity-view__item" key={schemaKey}>
							<div className="entity-view__title">{title}</div>
							<div className="entity-view__value">
								<input
									type={type}
									name={schemaKey}
									required={schema.required.includes(schemaKey)} />
							</div>
						</div>
					);
				})
			}
			<Button>Сохранить</Button>
			<BackButton value="Отменить" />
		</form>
	);
};