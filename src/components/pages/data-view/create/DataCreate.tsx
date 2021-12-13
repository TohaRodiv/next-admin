import { TControllerPaths, TRelations, TSchemaEntity } from "#services/swagger-parse/types";
import React, { SyntheticEvent, useState } from "react";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { useRouter } from "next/router";
import { formToJSON } from "../../../../libs/formToJSON";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { getFormattedEntityField } from "../../../../libs/create-update/getFormattedEntityField";
import { Divider, Form, message, Space, Switch } from "antd";
import { ButtonBack, ButtonSubmit } from "#components/molecules/action-buttons";
import { FormLayout, useForm } from "antd/lib/form/Form";
import { BorderVerticleOutlined, BorderHorizontalOutlined } from "@ant-design/icons";


type TProps = {
	schema: TSchemaEntity
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
	relations: TRelations
}

export const DataCreate: React.FC<TProps> = ({ schema, controllerPath, CRUDSchema, relations, }): JSX.Element => {
	const { properties: schemaProps } = schema;
	const router = useRouter();
	const [form] = useForm();
	const [formLayout, setFormLayout] = useState<FormLayout>("vertical");

	const handleChangeLayout = (isVertical: boolean) => {
		setFormLayout(isVertical ? "vertical" : "horizontal");
	};

	const dataFromFormToJSON = (data: any) => {
		const result: any = {};

		Object
			.entries(data)
			.forEach(([key, value]) => {
				if (typeof value !== "undefined") {
					result[key] = value;
				}
			});

		return result;
	};


	const handleCreate = async (dataFromForm: any): Promise<void> => {
		const data = dataFromFormToJSON(dataFromForm);
		const response = await APIFrontendService.createOne(controllerPath, data);
		const result = await response.json();

		if (201 !== response.status) {
			console.error(response.status, result);
			message.error(`Ошибка: ${result.statusCode} ${result.message}`);
		} else {
			message.success("Запись успешно создана!");
			router.back();
		}
	};


	return (

		<>
			<Switch
				defaultChecked={formLayout === "vertical"}
				checkedChildren={<BorderVerticleOutlined />}
				unCheckedChildren={<BorderHorizontalOutlined />}
				onChange={handleChangeLayout} />

			<Divider />

			<Form autoComplete="off" layout={formLayout} form={form} onFinish={handleCreate}>
				{
					Object.entries(schemaProps).map(([schemaKey, schemaValue]) => {
						let title = schemaValue["title"] ? schemaValue["title"] : schemaKey;

						return (

							getFormattedEntityField({
								CRUDSchema,
								defaultValue: null,
								schemaKey,
								schemaValue,
								isRequired: schema.required.includes(schemaKey),
								relations,
								Item: Form.Item,
								title,
							})

						);
					})
				}
				<Divider />
				<Space>
					<ButtonBack type="default" ghost={false} />
					<ButtonSubmit type="primary" ghost={false} />
				</Space>
			</Form>
		</>
	);
};