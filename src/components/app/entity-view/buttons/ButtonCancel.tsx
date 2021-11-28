import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";

type TProps = {
	text?: string | boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const ButtonCancel: React.FC<TProps> = ({ className, text, }): JSX.Element => {

	const classes = classNames(className);
	const router = useRouter();

	const handleClick = (e: SyntheticEvent) => {
		router.back();
	};

	return (
		<Button
			size="large"
			icon={<CloseOutlined />}
			type="default"
			className={classes}
			onClick={handleClick}>
				{
					typeof text === "undefined" ? "Отменить" : text
				}
		</Button>
	);
};