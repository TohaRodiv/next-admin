import { PropsWithChildren, } from "react";
import { HTMLElementAttributes } from "#types/HTMLElementAttributes";
import classNames from "classnames";
import { BackButton } from "../../app/button-back";


type TLayoutProps = PropsWithChildren<{}> & HTMLElementAttributes<HTMLElement>

export const Layout: React.FC<TLayoutProps> = ({ children, className, ...mainProps }: TLayoutProps): JSX.Element => {

	return (
		<>
			<BackButton />
			<main className={classNames("main", className)} {...mainProps}>
				{children}
			</main>
		</>
	);
};