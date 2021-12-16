import { AuthLayout } from "#components/templates/auth-layout";
import { FC } from "react";

type TProps = {}

const Login: FC<TProps> = (): JSX.Element => {
	return (
		<AuthLayout />
	);
}

export default Login;