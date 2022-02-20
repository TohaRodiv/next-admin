import { FC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { Link } from "#atoms/link";
import { ThunderboltOutlined } from "@ant-design/icons";
import { Space } from "antd";

type TProps = {
	className?: string
}

const AppLogo: FC <TProps> = ({
	className
}) => {
	const classes = classNames(styles["logo"], className);

	return (
		<Link href="/" className={classes}>
			<span className={styles["logo__inner"]}>
				<ThunderboltOutlined className={styles["logo__icon"]} />
				Electronly
			</span>
		</Link>
	);
};

export { AppLogo };