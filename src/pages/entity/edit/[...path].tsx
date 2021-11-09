import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { EntityEdit } from "#components/app/entity-view/edit/EntityEdit";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse-service/SwaggerParseService";
import { TSchemaEntity } from "#services/swagger-parse-service/types";

type TProps = {
	entity: {
		[propName: string]: any
	},
	schema: TSchemaEntity
}

type TSProps = {
	props: TProps
}

const entity_ =
{
	id: 3,
	name: "Three name",
	categoryId: 1,
	active: true,
	createdAt: new Date(),
};

const EntityPageViews: NextPage<TProps> = ({
	entity, schema,
}) => {

	return (
		<>
			<Head>
				<title>Редактор сущности</title>
			</Head>
			<Container>
				<EntityEdit schema={schema} entity={entity_}/>
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		entity: null,
		schema: null,
	};

	const paths = context.query["path"] as string[];
	const entityId = +paths.pop();
	
	if (isFinite(entityId)) {
		props.schema = SwaggerParseService.getUpdateOneSchema(paths);
		/**
		 * TODO: Получить по entityId сущность
		 */
	}

	return {
		props: props,
	};
}

export default EntityPageViews;