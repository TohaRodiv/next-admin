import { AuthLayout } from "#components/templates/auth-layout";
import { UserService } from "#services/user";
import { TAccessProps } from "#types/TAccessProps";
import { FC, ReactNode, } from "react";

type TProps = {
	access: TAccessProps
	children: ReactNode
}


export const AuthContainer: FC<TProps> = ({
	access,
	children,
}): JSX.Element => {

	UserService.setAuthorized(access.isAuthorized);

	if (UserService.checkAuthorized()) {
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