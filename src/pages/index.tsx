import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";
import { EntityList } from "../components/app/entity-view/EntityList";
import { SwaggerParseService } from "#services/swagger-parse/SwaggerParseService";
import { TCategoryEntity } from "#services/swagger-parse/types";

type TProps = {
	categoriesEntity: TCategoryEntity[]
}

type TSProps = Promise<{
	props: TProps
}>

const Home: NextPage<TProps> = ({categoriesEntity}) => {

	return (
		<>
			<Head>
				<title>Админка</title>
			</Head>
			<Container>
				<EntityList categories={categoriesEntity} />
			</Container>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<TSProps> => {
	return {
		props: {
			categoriesEntity: await SwaggerParseService.getCategoriesEntity(),
		}
	};
}


export default Home;