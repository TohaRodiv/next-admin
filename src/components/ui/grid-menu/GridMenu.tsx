import React from "react";
import classNames from "classnames";
import { TMenu } from "#types/TMenu";
import { Link } from "#ui/Link";
import { HTMLElementAttributes } from "#types/HTMLElementAttributes";


type TProps = {
	menu: TMenu
} & HTMLElementAttributes<HTMLUListElement>

export const GridMenu: React.FC<TProps> = ({ menu, className, ...ulProps }: TProps): JSX.Element => {
	return (
		menu.length && (
			<ul className={classNames("grid-menu", className)} {...ulProps}>
				{
					menu.map(item => (
						<li key={item.path} className={"grid-menu__item"}>
							<Link href={item.path} className={"grid-menu__link"}>
								{item.title}
							</Link>
						</li>
					))
				}
			</ul>
		)
	);
};