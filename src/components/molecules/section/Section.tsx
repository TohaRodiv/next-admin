import { FC, ReactElement } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

export type TSectionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
	theme?: "light" | "dark"
}

const Section: FC<TSectionProps> = ({
	children,
	className,
	theme,
	...props
}) => {
	const classes = classNames(
		styles["section"],
		{
			[styles[`section--theme--${theme}`]]: !!theme,
		},
		className
	);

	return (
		<section className={classes} {...props}>
			{children}
		</section>
	);
};

Section.defaultProps = {
	theme: "light",
};

export { Section };