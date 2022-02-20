import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import { FC, } from "react";
import { TButtonActionProps } from "./types";

const ButtonBack: FC<TButtonActionProps> = ({
	text,
	children,
	...buttonProps
}): JSX.Element => {
	const router = useRouter();

	const handleClick = () => {
		router.back();
	};

	return (
		<Button
			htmlType="button"
			onClick={handleClick}
			{...buttonProps}>
			{children || text}
		</Button>
	);
};

ButtonBack.defaultProps = {
	icon: <LeftOutlined />,
	type: "primary",
	ghost: true,
	text: "Назад",
	size: "middle",
};

export { ButtonBack };