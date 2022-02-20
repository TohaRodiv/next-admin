import { PlusOutlined } from "@ant-design/icons";
import { FC } from "react";
import { ButtonGoTo } from "./ButtonGoTo";
import { TButtonActionProps, TButtonGoToProps } from "./types";

const ButtonCreate: FC<TButtonActionProps & TButtonGoToProps> = (buttonProps): JSX.Element => {
	return <ButtonGoTo {...buttonProps} />;
};

ButtonCreate.defaultProps = {
	icon: <PlusOutlined />,
	text: "Добавить",
};

export { ButtonCreate };