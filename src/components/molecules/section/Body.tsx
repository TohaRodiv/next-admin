import { FC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";

type TProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

const Body: FC<TProps> = ({
	children,
	className,
	...props
}) => {
	const classes = classNames(styles["section__article"], className);
	return (
		<article className={classes} {...props}>
			{children}
		</article>
	);
};

export { Body };