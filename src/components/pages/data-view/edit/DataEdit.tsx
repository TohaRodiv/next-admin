import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TSchemaEntity, TEntity, TControllerPaths, TRelations } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { useRouter } from "next/router";
import { HTMLInputTypeAttribute, useState, } from "react";
import { getFormattedEntityField } from "#libs/create-update/getFormattedEntityField";
import { getTypeField } from "#libs/getTypeField";
import { Divider, Form, message, Space, Switch, } from "antd";
import { ButtonBack, ButtonSubmit } from "#components/molecules/action-buttons";
import { BorderHorizontalOutlined, BorderVerticleOutlined } from "@ant-design/icons";
import { FormLayout, useForm } from "antd/lib/form/Form";

type TProps = {
	schema: TSchemaEntity
	entity: TEntity
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
	relations: TRelations
}


export const DataEdit: React.FC<TProps> = ({ schema, entity, controllerPath, CRUDSchema, relations, }): JSX.Element => {
	const { properties: schemaProps } = schema;
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [formLayout, setFormLayout] = useState<FormLayout>("vertical");
	const [form] = useForm();

	let isBack = false;

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

	const handleUpdateEntity = async (dataFromForm: any) => {
		setLoading(true);
		const data = dataFromFormToJSON(dataFromForm);
		const response = await APIFrontendService.updateById(controllerPath, entity.id, data);
		const result = await response.json();

		if (200 !== response.status) {
			console.error(response.status, result);
			message.error("Произошла ошибка изменения!");
		} else {
			message.success("Запись успешно изменена!");
			isBack && router.back();
		}
		setLoading(false);
		isBack = true;
	};

	return (
		<>
			<Switch
				defaultChecked={formLayout === "vertical"}
				checkedChildren={<BorderVerticleOutlined />}
				unCheckedChildren={<BorderHorizontalOutlined />}
				onChange={handleChangeLayout} />

			<Divider />

			<Form autoComplete="off" layout={formLayout} onFinish={handleUpdateEntity} form={form}>
				{
					Object.entries(schemaProps).map(([schemaKey, schemaValue]) => {
						let title = schemaKey;
						let value = "<Значение не найдено>";
						let type: HTMLInputTypeAttribute = getTypeField(
							schemaProps[schemaKey]["type"],
							schemaProps[schemaKey]["format"]
						);
						const defaultValue: {
							defaultValue?: any
							defaultChecked?: boolean
						} = {};

						if (typeof entity[schemaKey] !== "undefined") {
							value = entity[schemaKey];
							title = schemaProps[schemaKey]["title"] ? schemaProps[schemaKey]["title"] : schemaKey;
						}

						switch (type) {
							case "checkbox":
								defaultValue.defaultChecked = !!value;
								break;
							default:
								defaultValue.defaultValue = value ? value.toString() : null;
						}

						return (

							getFormattedEntityField({
								CRUDSchema,
								defaultValue: value,
								schemaKey,
								schemaValue,
								isRequired: false,
								relations,
								title,
								Item: Form.Item
							})

						);

					})
				}

				<Form.Item>
					<Space>
						<ButtonBack
							type="default"
							ghost={false} />
						<ButtonSubmit
							onClick={() => { isBack = true; }}
							text="Сохранить и закрыть"
							type="primary"
							ghost={true}
							loading={isLoading} />
						<ButtonSubmit
							text="Сохранить"
							type="primary"
							ghost={false}
							loading={isLoading} />
					</Space>
				</Form.Item>
			</Form>
		</>
	);
};