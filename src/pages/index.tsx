import { Container } from "#components/atoms/container";
import { Section } from "#components/molecules/section/Section";
import { NextPage } from "next";
import Head from "next/head";

type TProps = {}

const HomePage: NextPage<TProps> = ({ }) => {
	return (
		<>
			<Head>
				<title>Electronly - Бизнес</title>
			</Head>
			<Section>
				<Container>
					<h1>Hello, world!</h1>
				</Container>
			</Section>
		</>
	);
};

export default HomePage;