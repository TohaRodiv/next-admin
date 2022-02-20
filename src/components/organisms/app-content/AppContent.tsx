import { FC } from "react";
import classNames from "classnames";
import { BasicProps, Content } from "antd/lib/layout/layout";
import styles from "./style.module.scss";

type TProps = BasicProps & {}

const AppContent: FC<TProps> = ({
	className,
	children,
	...props
}) => {
	const classes = classNames(styles["app-content"], className);
	return (
		<Content className={classes} {...props}>
			{children}
		</Content>
	);
};

export { AppContent };