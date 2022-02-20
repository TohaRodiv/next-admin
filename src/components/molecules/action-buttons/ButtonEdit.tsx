import { EditOutlined } from "@ant-design/icons";
import { FC } from "react";
import { ButtonGoTo } from "./ButtonGoTo";
import { TButtonActionProps, TButtonGoToProps } from "./types";

const ButtonEdit: FC<TButtonActionProps & TButtonGoToProps> = (buttonProps): JSX.Element => {
	return <ButtonGoTo {...buttonProps} />;
};

ButtonEdit.defaultProps = {
	icon: <EditOutlined />,
	text: "Редактировать",
};

export { ButtonEdit };