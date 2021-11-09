import { EntityCreate } from "#components/app/entity-view/create";
import { SwaggerParseService } from "#services/swagger-parse-service/SwaggerParseService";
import { TSchemaEntity } from "#services/swagger-parse-service/types";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";

type TProps = {
	schema: TSchemaEntity
	entityId: string
}

type TSProps = {
	props: TProps
}

const EntityPageViews: NextPage<TProps> = ({ entityId, schema, }): JSX.Element => {

	return (
		<>
			<Head>
				<title>Создать новый экземпляр сущности</title>
			</Head>
			<Container>
				<EntityCreate schema={schema} />
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		schema: null,
		entityId: null,
	};

	const paths = context.query["path"] as string[];

	if (Array.isArray(paths)) {
		props.schema = SwaggerParseService.getCreateOneSchema(paths);
	}

	return {
		props: props,
	};
}

export default EntityPageViews;