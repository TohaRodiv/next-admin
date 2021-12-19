import { SaveOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames";

type TProps = {
	text?: string | boolean
	className?: string
}

export const ButtonSave: React.FC<TProps> = ({ className, text, }): JSX.Element => {

	const classes = classNames(className);

	return (
		<Button
			ghost
			size="large"
			icon={<SaveOutlined />}
			type="primary"
			htmlType="submit"
			className={classes}>
				{
					typeof text === "undefined" ? "Сохранить" : text
				}
		</Button>
	);
};