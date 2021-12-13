import { AuthLayout } from "#components/templates/auth-layout";
import { FC, ReactNode, } from "react";

type TProps = {
	access: {
		isAuthorized: boolean
		access_token?: string
	}
	children: ReactNode
}


export const AuthContainer: FC<TProps> = ({
	access,
	children,
}): JSX.Element => {

	if (!access.isAuthorized) {
		return (
			<>
				{children}
			</>
		);
	} else {
		return (
			<AuthLayout />
		);
	}

};