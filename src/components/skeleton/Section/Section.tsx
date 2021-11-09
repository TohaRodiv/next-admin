import { ReactNode, } from "react";
import classNames from "classnames";
import { HTMLElementAttributes } from "#types/HTMLElementAttributes";


type TProps = {
	children: ReactNode
} & HTMLElementAttributes <HTMLElement>

export const Section: React.FC <TProps> = ({ children, className, ...sectionProps }: TProps): JSX.Element => {
	const classes = classNames ("section", className);
	return (
		<section className={ classes } {...sectionProps}>
			{children}
		</section>
	);
};