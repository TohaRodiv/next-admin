import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import { FC, } from "react";
import { TButtonActionProps, TButtonGoToProps } from "./types";

const ButtonGoTo: FC<TButtonActionProps & TButtonGoToProps> = ({
	text,
	path,
	children,
	...buttonProps
}): JSX.Element => {
	const router = useRouter();

	const goToCreatePage = (path: string): void => {
		router.push(path);
	};

	return (
		<Button
			htmlType="button"
			onClick={() => goToCreatePage(path)}
			{...buttonProps}>
			{children || text}
		</Button>
	);
};

ButtonGoTo.defaultProps = {
	icon: <PlusOutlined />,
	type: "primary",
	ghost: true,
	text: "Добавить",
	size: "middle",
};

export { ButtonGoTo };