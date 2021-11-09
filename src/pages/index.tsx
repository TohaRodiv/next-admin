import { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";
import { EntityList } from "../components/app/entity-view/EntityList";
import { SwaggerParseService } from "#services/swagger-parse-service/SwaggerParseService";
import { useEffect } from "react";

type TProps = {}

type TSProps = Promise<{
	props: TProps
}>

const Home: NextPage<TProps> = (props: TProps) => {

	useEffect(() => {
		console.log(SwaggerParseService.getUpdateOneSchema("/tasks"));
	}, []);
	return (
		<>
			<Head>
				<title>Админка</title>
			</Head>
			<Container>
				<EntityList categories={SwaggerParseService.getCategoriesEntity()} />
			</Container>
		</>
	);
};

export default Home;