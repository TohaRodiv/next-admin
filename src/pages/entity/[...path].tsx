import { Container } from "#components/atoms/container";
import { Link } from "#components/atoms/link";
import { Section } from "#components/molecules/section";
import Title from "antd/lib/typography/Title";
import { NextPage } from "next";
import Head from "next/head";

type TProps = {};

const ViewEntities: NextPage<TProps> = ({}) => {
	return (
		<>
			<Head>
				<title>Просмотр</title>
			</Head>
			<Section>
				<Container>
					<Section.Header>
						<Title level={2}>Просмотр</Title>
					</Section.Header>
					<Section.Body>
						<Link href="/entity/create/shop/products">Добавить</Link>
					</Section.Body>
				</Container>
			</Section>
		</>
	);
};

export default ViewEntities;