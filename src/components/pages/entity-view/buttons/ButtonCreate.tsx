import { TButtonProps } from "#components/ui/Button/Button";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";

type TProps = {
	path: string
	text?: string | boolean
} & TButtonProps

export const ButtonCreate: React.FC<TProps> = ({ className, path, text, }): JSX.Element => {

	const classes = classNames(className);
	const router = useRouter();

	const handleClick = (e: SyntheticEvent) => {
		router.push(path);
	};

	return (
		<Button
			size="large"
			ghost
			type="primary"
			icon={<PlusOutlined />}
			className={classes}
			onClick={handleClick}>
			{typeof text === "undefined" ? "Добавить" : text}
		</Button>
	);
};