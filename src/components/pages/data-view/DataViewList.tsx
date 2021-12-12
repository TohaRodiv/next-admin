import { Section } from "#components/molecules/Section";
import { Link } from "#components/atoms/Link";
import { getStandartFieldsEntity } from "#libs/getStrandartFieldsEntity";
import { TEntity, TSchemaEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { Card } from "antd";
import classNames from "classnames";
import { useState, SyntheticEvent } from "react";
import { getActionsCRUD } from "#libs/getActionsCRUD";
import { TDataFields } from "./types";


type TProps = {
	entities: TEntity[]
	schema: TSchemaEntity
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
	relationFields?: TDataFields
}


export const DataViewList: React.FC<TProps> = ({
	entities: _entities,
	availableCRUD,
	CRUDSchema,
	controllerPath,
	schema,
	relationFields,
}): JSX.Element => {

	const [gridType, setGridType] = useState("grid");
	const [entities, setEntities] = useState(_entities);
	const classes = classNames("data-view", `data-view--${gridType}`);


	const updateState = (entities: TEntity[]) => {
		setEntities(entities);
	}

	const handleChangeGridType = (event: SyntheticEvent): void => {
		const target = event.currentTarget;
		const gridType = target.getAttribute("data-view") || "grid";

		setGridType(gridType);
	}

	const handleDelete = (entity: TEntity) => {
		updateState(entities.filter(({ path }) => path != entity.path));
	};


	return (
		<>
			{/* <Section>
				<Button.Group>
					<Button data-view="grid" icon={<AppstoreOutlined />} onClick={handleChangeGridType}>Сетка</Button>
					<Button data-view="list" icon={<UnorderedListOutlined />} onClick={handleChangeGridType}>Список</Button>
				</Button.Group>
			</Section> */}
			<Section>
				<ul className={classes}>
					{
						entities.map(entity => {

							const standartFieldsEntity = getStandartFieldsEntity(entity, ["id", "name"]);

							const dataFields: { [prop: string]: any } = {
								id: standartFieldsEntity.id,
								title: standartFieldsEntity.name,
							};

							for (const relationKey in relationFields) {
								const { field, getFormattedValue, } = relationFields[relationKey];
								if (field in entity) {
									dataFields[relationKey] = getFormattedValue ? getFormattedValue(entity[field]) : entity[field];
								}
							}

							const { id, title, ...otherFields } = dataFields;

							const actions = getActionsCRUD({
								id,
								availableCRUD,
								controllerPath,
								handleDelete,
							});

							const images = Array.isArray(otherFields.images) ?
								otherFields.images.map(path => (
									<Link href={availableCRUD.getPathGetOne(entity.id) || "#"} className="item-view__link-image">
										<img src={path} alt={title} key={path} title={id} className="item-view__image" />
									</Link>
								)) : [];



							return (
								<li className="data-view__item" key={id}>
									<div className="item-view">
										<Card
											className="item-view__card"
											actions={actions}
											cover={images.length > 0 ? images[0] : null}>
											<Card.Meta
												title={title}
												description={otherFields.subtitle ? otherFields.subtitle : null} />
										</Card>
									</div>
								</li>
							);
						})
					}
				</ul>
			</Section>
		</>
	);
}