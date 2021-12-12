import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ButtonType } from "antd/lib/button";
import { useRouter } from "next/router";
import { FC, ReactChildren, ReactNode } from "react";

type TProps = {
	icon?: ReactNode
	buttonType?: ButtonType
	ghost?: boolean
	children?: ReactChildren | string | null | boolean
}

const ButtonBack: FC<TProps> = ({
	icon,
	buttonType,
	ghost,
	children,
}): JSX.Element => {
	const router = useRouter();

	const handleClick = () => {
		router.back();
	};

	return (
		<Button
			htmlType="button"
			onClick={handleClick}
			icon={icon}
			type={buttonType}
			ghost={ghost}>
			{children || "Назад"}
		</Button>
	);
};

ButtonBack.defaultProps = {
	icon: <LeftOutlined />,
	buttonType: "default",
	ghost: true,
};

export { ButtonBack };