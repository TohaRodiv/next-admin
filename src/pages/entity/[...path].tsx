import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { EntityViews } from "#components/app/entity-view";
import { Container } from "react-grid-system";
import { SwaggerParseService } from "#services/swagger-parse-service/SwaggerParseService";
import { TEntity, TSchemaEntity } from "#services/swagger-parse-service/types";

type TProps = {
	entities: TEntity[],
	schema: TSchemaEntity
	path: string
}

type TSProps = Promise<{
	props: TProps
}>

const EntityPageViews: NextPage<TProps> = ({ entities, schema, path }) => {

	return (
		<>
			<Head>
				<title>Просмотр списка экземпляров сущности</title>
			</Head>
			<Container>
				<>
					<EntityViews
						entities={entities}
						schema={schema}
						caption="Задачи"
						availableCRUD={SwaggerParseService.getAvailableCRUD(path)} />
				</>
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		entities: null,
		schema: null,
		path: null,
	};

	const paths = context.query["path"] as string[];

	if (Array.isArray(paths)) {
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.path = controllerPath;
		props.schema = await SwaggerParseService.getViewManySchema(controllerPath);
		props.entities = await SwaggerParseService.APIService.getMany(controllerPath);
		console.log(props.entities);
	}

	return {
		props,
	};
}

export default EntityPageViews;