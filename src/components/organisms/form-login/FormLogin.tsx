import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, ImportOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useState } from 'react';
import { UserService } from '#services/user-service';

export const FormLogin = ({ className, }) => {
	const classes = classNames("login-form", className);
	const [loading, setLoading] = useState(false);

	const onFinish = async ({ username, password }) => {
		setLoading(true);

		const isLoggedIn = await UserService.login({ username, password });

		if (isLoggedIn) {
			message.success("Вы успешно авторизовались, переходим в админку...");
			location.reload();
		} else {
			message.error("Неверный логин или пароль!");
		}

		setLoading(false);
	};

	return (
		<Form
			name="normal_login"
			className={classes}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}>
			<Form.Item
				name="username"
				rules={[
					{
						required: true,
						message: 'Имя пользователя обязательно!',
					},
				]}>
				<Input prefix={<UserOutlined />} placeholder="Имя" size="large" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: 'Пароль является обязательным в нашей системе!',
					},
				]}>
				<Input.Password
					size="large"
					prefix={<LockOutlined />}
					type="password"
					placeholder="Пароль"
				/>
			</Form.Item>

			<Form.Item>
				<Button
					block
					type="primary"
					htmlType="submit"
					size="large"
					icon={<ImportOutlined />}
					loading={loading}>
					Авторизация
				</Button>
			</Form.Item>
		</Form>
	);
};
