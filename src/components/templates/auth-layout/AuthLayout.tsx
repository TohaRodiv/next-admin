import { FormLogin } from "#components/organisms/form-login";
import { CrownOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC, useState } from "react";
import classNames from "classnames";

export const AuthLayout: FC = (): JSX.Element => {

	const [isVisibleForm, setVisibleForm] = useState(false);

	const handleClick = () => {
		setVisibleForm(true);
	}

	return (
		<div className="auth-layout">
			<div className="auth-layout__inner">
				<Button
					className="auth-layout__btn"
					ghost
					size="large"
					icon={<CrownOutlined />}
					onClick={handleClick}>
					Авторизация
				</Button>
				<FormLogin className={classNames("auth-layout__form", { active: isVisibleForm })} />
			</div>
		</div>
	);
};