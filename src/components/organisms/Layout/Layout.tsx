import { PropsWithChildren, } from "react";
import { HTMLElementAttributes } from "#types/HTMLElementAttributes";
import classNames from "classnames";
import { ButtonCancel } from "#components/pages/entity-view/buttons/ButtonCancel";


type TLayoutProps = PropsWithChildren<{}> & HTMLElementAttributes<HTMLElement>

export const Layout: React.FC<TLayoutProps> = ({ children, className, ...mainProps }: TLayoutProps): JSX.Element => {

	return (
		<>
			{/* TODO: Заменить на компонент кнопки "Назад" */}
			<ButtonCancel /> 
			<main className={classNames("main", className)} {...mainProps}>
				{children}
			</main>
		</>
	);
};