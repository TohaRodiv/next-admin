import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";

type TProps = {
	path: string
	text?: string | boolean
	className?: string
}

export const ButtonView: React.FC<TProps> = ({ className, path, text, }): JSX.Element => {

	const classes = classNames(className);
	const router = useRouter();

	const handleClick = (e: SyntheticEvent) => {
		router.push(path);
	};

	return (
		<Button
			size="large"
			icon={<EyeOutlined />}
			type="default"
			className={classes}
			onClick={handleClick}>
				{
					typeof text === "undefined" ? "Просмотр" : text
				}
		</Button>
	);
};