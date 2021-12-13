import { EyeOutlined } from "@ant-design/icons";
import { FC } from "react";
import { ButtonGoTo } from "./ButtonGoTo";
import { TButtonActionProps, TButtonGoToProps } from "./types";

const ButtonView: FC<TButtonActionProps & TButtonGoToProps> = (buttonProps): JSX.Element => {
	return <ButtonGoTo {...buttonProps} />;
};

ButtonView.defaultProps = {
	icon: <EyeOutlined />,
	text: "Просмотр",
};

export { ButtonView };