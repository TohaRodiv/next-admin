import { FC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { Link } from "#atoms/link";
import { ThunderboltOutlined } from "@ant-design/icons";

type TProps = {
	className?: string
	withoutIcon?: boolean
}

const AppLogo: FC <TProps> = ({
	className,
	withoutIcon
}) => {
	const classes = classNames(styles["logo"], className);

	return (
		<Link href="/" className={classes}>
			<span className={styles["logo__inner"]}>
				{!withoutIcon && <ThunderboltOutlined className={styles["logo__icon"]} />}
				Electronly
			</span>
		</Link>
	);
};

AppLogo.defaultProps = {
	withoutIcon: false,
}

export { AppLogo };