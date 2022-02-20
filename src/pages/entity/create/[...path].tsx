import { Container } from "#components/atoms/container";
import { Section } from "#components/molecules/section";
import Title from "antd/lib/typography/Title";
import { GetServerSideProps, NextPage, NextPageContext } from "next";
import Head from "next/head";

type TProps = {};

const CreateEntity: NextPage<TProps> = ({ }) => {
	return (
		<>
			<Head>
				<title>Добавить</title>
			</Head>
			<Section>
				<Container>
					<Section.Header>
						<Title level={2}>Добавить</Title>
					</Section.Header>
					<Section.Body>
					</Section.Body>
				</Container>
			</Section>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const props: TProps= {
		endpoint: null,
	};

	//

	return {
		props,
	};
};

export default CreateEntity;