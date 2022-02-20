import { Container } from "#atoms/container";
import { BasicProps, Header } from "antd/lib/layout/layout";
import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { AppLogo } from "#molecules/app-logo";

type TProps = BasicProps & {}

const AppHeader: FC<TProps> = ({
	className,
	...props
}) => {
	const [collapsedMenu, setCollapsedMenu] = useState(false);
	const [show, setShow] = useState(false);

	const toggleCollapsedMenu = () => {
		setCollapsedMenu(!collapsedMenu);
	}

	useEffect(() => {
		setShow(true);
	}, []);

	const classes = classNames(styles["app-header"], className);
	const menuClasses = classNames(styles["app-header__menu-icon"], styles["app-header__toggle-menu"]);

	return (
		<>
			<Header className={classes} {...props}>
				<Container>
					<div className={styles["app-header__inner"]}>
						
					</div>
				</Container>
			</Header>
		</>
	);
};

export { AppHeader };