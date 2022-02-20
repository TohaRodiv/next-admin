import { Container } from "#components/atoms/container";
import { Empty } from "#components/molecules/empty";
import { Section } from "#components/molecules/section";
import { CreateEntityForm } from "#components/organisms/create-entity-form";
import { getControlerPathFromArray } from "#libs/getControllerPathFromArray";
import { SwaggerDocParser } from "#libs/swagger-doc-parser";
import { TEndpoint } from "#libs/swagger-doc-parser/types";
import Title from "antd/lib/typography/Title";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

type TProps = {
	endpoint: TEndpoint,
};

const CreateEntity: NextPage<TProps> = ({
	endpoint,
}) => {
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
						{
							endpoint.methods.create ? <CreateEntityForm schema={endpoint.methods.create.schema} /> : (
								<Empty />
							)
						}
					</Section.Body>
				</Container>
			</Section>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const props: TProps = {
		endpoint: null,
	};

	const paths = query["path"] as string[];

	if (Array.isArray(paths)) {
		const controllerPath = getControlerPathFromArray(paths);
		props.endpoint = await SwaggerDocParser.getEndpointByPath(controllerPath);
	}

	return {
		props,
	};
};

export default CreateEntity;