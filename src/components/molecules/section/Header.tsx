import { FC } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

type TProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

const Header: FC<TProps> = ({
	children,
	className,
	...props
}) => {
	const classes = classNames(styles["section__header"], className);
	return (
		<header className={classes} {...props}>
			{children}
		</header>
	);
};

export { Header };