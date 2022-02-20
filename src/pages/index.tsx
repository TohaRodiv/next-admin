import { Container } from "#components/atoms/container";
import { Section } from "#components/molecules/section/Section";
import { AuthContainer } from "#components/organisms/auth-container";
import { NextPage } from "next";
import Head from "next/head";

type TProps = {}

const HomePage: NextPage<TProps> = ({ }) => {
	return (
		<>
			<AuthContainer access={{ isAuthorized: false, access_token: null }}>
				<Head>
					<title>Electronly - Бизнес</title>
				</Head>
				<Section>
					<Container>
						<h1>Hello, world!</h1>
					</Container>
				</Section>
			</AuthContainer>
		</>
	);
};

export default HomePage;