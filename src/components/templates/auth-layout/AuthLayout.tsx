import { FormLogin } from "#components/organisms/form-login";
import { FC } from "react";
import classNames from "classnames";
import { Container } from "#components/atoms/container";
import { Section } from "#components/molecules/section";

export const AuthLayout: FC = (): JSX.Element => {

	return (
		<div className="auth-layout">
			<div className="auth-layout__inner">
				<Section>
					<Container>
						<Section.Body style={{maxWidth: "400px", margin: "0 auto"}}>
							<FormLogin className={classNames("auth-layout__form")} />
						</Section.Body>
					</Container>
				</Section>
			</div>
		</div>
	);
};