import { EntityView } from "#components/app/entity-view/view";
import { SwaggerParseService } from "#services/swagger-parse-service/SwaggerParseService";
import { TEntity, TSchemaEntity } from "#services/swagger-parse-service/types";
import { NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";

type TProps = {
	entity: TEntity
	schema: TSchemaEntity
}

type TSProps = {
	props: TProps,
}

const EntityPageView: React.FC<TProps> = ({ entity, schema, }): JSX.Element => {

	return (
		<>
			<Head>
				<title>Просмотр сущности</title>
			</Head>
			<Container>
				<EntityView schema={schema} entity={entity} />
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
		const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
		props.schema = await SwaggerParseService.getViewOneSchema(controllerPath);
		props.entity = await SwaggerParseService.APIService.getById(controllerPath, entityId);
	}

	return {
		props,
	};
}

export default EntityPageView;