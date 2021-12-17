import type { TSchemaEntity, TEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { useRouter } from "next/router";
import { getFormattedEntityField } from "#libs/view/getFormattedEntityField";
import { Card } from "antd";
import { TDataFields } from "../types";
import { ButtonBack, ButtonDelete, ButtonEdit } from "#components/molecules/action-buttons";
import { CloseOutlined } from "@ant-design/icons";

type TProps = {
	schema: TSchemaEntity
	entity: TEntity
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
	relationFields?: TDataFields
}

export const DataView: React.FC<TProps> = ({
	schema,
	entity,
	availableCRUD,
	controllerPath,
	CRUDSchema,
	relationFields,
}): JSX.Element => {

	relationFields = relationFields || {};

	const { properties: schemaProps } = schema;
	const router = useRouter();

	const handleDelete = async (_entity: TEntity) => {
		router.back();
	};

	const actions: JSX.Element[] = [];

	actions.push(
		<ButtonBack
			type="default"
			ghost={false} />
	);

	if (availableCRUD.getPathDeleteOne) {
		actions.push(
			<ButtonDelete
				danger
				controllerPath={controllerPath}
				entityId={entity.id}
				onDelete={handleDelete}
				key="action-delete-one" />
		);
	}

	if (availableCRUD.getPathUpdateOne) {
		actions.push(
			<ButtonEdit
				type="primary"
				ghost={false}
				path={availableCRUD.getPathUpdateOne(entity.id)}
				key="action-update-one" />
		);
	}

	const formattedRelationFields = Object
		.entries(relationFields)
		.filter(([_relationKey, relationValue]) => relationValue.field in entity)
		.map(([relationKey, relationValue]) => {
			if (relationValue.getFormattedValue) {
				return {
					[relationKey]: relationValue.getFormattedValue(entity[relationValue.field]),
				};
			} else {
				return {
					[relationKey]: entity[relationValue.field]
				};
			}
		});

	let images = [null];

	Object.values(formattedRelationFields).forEach((field) => {
		const fieldKey = Object.keys(field)[0];
		switch (fieldKey) {
			case "images":
				images = field[fieldKey].map(image => {
					return (
						<img src={image} alt="" key={entity.id} className="data-view__image" />
					);
				});
				break;
		}
	});

	const getCardComponent = () => (
		<Card actions={actions} cover={images[0]}>
			{
				Object.entries(entity).map(([key, value]) => {
					const schemaValue = schema.properties[key];
					let entityValue = getFormattedEntityField(value, schemaValue, CRUDSchema);

					Object
						.entries(relationFields)
						.filter(([_relationKey, relationValue]) => relationValue.field == key)
						.forEach(([_relationKey, relationValue]) => {
							if (relationValue.getFormattedValue) {
								entityValue = relationValue.getFormattedValue(value);
							}
						});

					return (

						<Card
							style={{ marginTop: "1rem" }}
							key={key}
							size="small"
							title={schemaValue.title || key}
							type="inner">
							{entityValue}
						</Card>

					);
				})
			}
		</Card>
	);

	return (
		<>
			{
				getCardComponent()
			}
		</>
	);
}