import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";
import { EntityList } from "#components/pages/entity-list";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import type { TAvailableCRUDPaths, TCategoryEntity } from "#services/swagger-parse/types";

type TProps = {
	categoriesEntity: TCategoryEntity[]
	categories: Array<{
		availableCRUDPaths: TAvailableCRUDPaths
	} & TCategoryEntity>
}

type TSProps = Promise<{
	props: TProps
}>

const Home: NextPage<TProps> = ({ categoriesEntity, categories, }) => {

	return (
		<>
			<Head>
				<title>Админка</title>
			</Head>
			<Container>
				<EntityList categories={categories} />
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	const props = {
		categoriesEntity: null,
		categories: null,
	};

	props.categoriesEntity = await SwaggerParseService.getCategoriesEntity();

	const categories = Object
		.values(props.categoriesEntity)
		.map(async ({path, ...props}) => {
			let paths = path.split('/');
			paths.shift();
			const controllerPath = SwaggerParseService.getControlerPathFromArray(paths);
			const availableCRUDPaths = await SwaggerParseService.getAvailableCRUDPaths(controllerPath);

			return {
				availableCRUDPaths,
				path,
				...props,
			};
		});

	props.categories = await Promise.all(categories);

	return {
		props,
	};
}


export default Home;