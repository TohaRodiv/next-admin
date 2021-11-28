import { TButtonProps } from "#components/ui/Button/Button";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";

type TProps = {
	path: string
	text?: string | boolean
} & TButtonProps

export const ButtonEdit: React.FC<TProps> = ({ className, path, text, }): JSX.Element => {

	const classes = classNames(className);
	const router = useRouter();

	const handleClick = (e: SyntheticEvent) => {
		router.push(path);
	};

	return (
		<Button
			size="large"
			icon={<EditOutlined />}
			type="default"
			className={classes}
			onClick={handleClick}>
				{
					typeof text === "undefined" ? "Редактировать" : text
				}
		</Button>
	);
};