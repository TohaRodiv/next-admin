import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";
import { EntityList } from "#components/pages/entity-list";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import type { TAvailableCRUDPaths, TCategoryEntity } from "#services/swagger-parse/types";
import { AuthContainer } from "#components/organisms/auth-container";
import { TAccessProps } from "#types/TAccessProps";
import { checkAuthorized } from "#libs/auth/checkAuthorized";

type TProps = {
	access: TAccessProps
	categoriesEntity: TCategoryEntity[]
	categories: Array<{
		availableCRUDPaths: TAvailableCRUDPaths
	} & TCategoryEntity>
}

type TSProps = Promise<{
	props: TProps
}>

const Home: NextPage<TProps> = ({ categoriesEntity, categories, access }) => {
	return (
		<AuthContainer access={access}>
			<Head>
				<title>Админка</title>
			</Head>
			<Container>
				<EntityList categories={categories} />
			</Container>
		</AuthContainer>
	);
};

export const getServerSideProps = async ({ req, res }: NextPageContext): Promise<TSProps> => {
	const props = {
		categoriesEntity: null,
		categories: null,
		access: {
			isAuthorized: false,
			access_token: null,
		}
	};

	props.access = await checkAuthorized(req);
	
	if (!props.access.isAuthorized) {
		return {
			props,
		};
	}

	props.categoriesEntity = await SwaggerParseService.getCategoriesEntity();

	const categories = Object
		.values(props.categoriesEntity)
		.map(async ({ path, ...props }) => {
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