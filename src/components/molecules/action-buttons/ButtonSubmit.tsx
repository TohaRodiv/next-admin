import { SaveOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";
import { TButtonActionProps } from "./types";

const ButtonSubmit: FC<TButtonActionProps> = ({
	text,
	children,
	...buttonProps
}): JSX.Element => {

	return (
		<Button
			htmlType="submit"
			{...buttonProps}>
			{children || text}
		</Button>
	);
};

ButtonSubmit.defaultProps = {
	icon: <SaveOutlined />,
	type: "default",
	ghost: true,
	text: "Сохранить",
	size: "middle",
};

export { ButtonSubmit };