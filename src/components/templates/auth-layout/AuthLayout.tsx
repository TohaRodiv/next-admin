import { FormLogin } from "#components/organisms/form-login";
import { CrownOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";

export const AuthLayout: FC = (): JSX.Element => {

	return (
		<div className="auth-layout">
			<div className="auth-layout__inner">
				<Button className="auth-layout__btn" ghost size="large" icon={<CrownOutlined />}>Авторизация</Button>
				<FormLogin className="auth-layout__form" />
			</div>
		</div>
	);
};