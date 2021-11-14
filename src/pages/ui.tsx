import { ButtonDelete, ButtonEdit, ButtonView } from "#components/app/entity-view/buttons";
import { Section } from "#components/skeleton/Section";
import { ButtonGroup } from "#components/ui/button-group";
import { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-grid-system";

const UI: NextPage = () => {

	return (
		<>
			<Head>
				<title>Админка | UI/UX</title>
			</Head>
			<Container>
				<Section>
					<ButtonGroup>
					</ButtonGroup>
				</Section>
			</Container>
		</>
	);
};

export default UI;