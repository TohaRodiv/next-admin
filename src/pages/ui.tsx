import { ButtonDelete, ButtonEdit, ButtonView } from "#components/app/entity-view/buttons";
import { formToJSON } from "#components/app/entity-view/libs/formToJSON";
import { Section } from "#components/skeleton/Section";
import { ButtonGroup } from "#components/ui/button-group";
import { NextPage } from "next";
import Head from "next/head";
import { SyntheticEvent } from "react";
import { Container } from "react-grid-system";

const UI: NextPage = () => {

	const handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const form = e.currentTarget;
		console.clear();

		const data = formToJSON(form.elements);
		console.log(data);
	}

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
				<Section>
					<form onSubmit={handleSubmit}>
						<input type="text" name="name" />
						<br />
						<input type="username" name="number-phone" />
						<br />
						<input type="date" name="date" />
						<br />
						<input type="color" name="color" />
						<br />
						<input type="file" name="file" />
						<br />
						<br />
						<select name="select-city">
							<option value="value-1">1</option>
							<option value="value-2">2</option>
							<option value="value-3">3</option>
						</select>
						<br />
						<ButtonGroup>
							<input type="checkbox" name="active" />
						</ButtonGroup>
						<br />
						<ButtonGroup>
							<input type="checkbox" name="check-auto[0]" />
							<input type="checkbox" name="check-auto[1]" />
							<input type="checkbox" name="check-auto[2]" />
						</ButtonGroup>
						<br />
						<br />
						<ButtonGroup>
							<input type="reset" value="Очистить" className="btn btn--secondary" />
							<input type="submit" value="Тестировать" className="btn btn--primary" />
						</ButtonGroup>
					</form>
				</Section>
			</Container>
		</>
	);
};

export default UI;