import { Button } from "#components/ui/Button";
import { TButtonProps } from "#components/ui/Button/Button";
import classNames from "classnames";

type TProps = {
	text?: string | boolean
} & TButtonProps

export const ButtonSave: React.FC<TProps> = ({ className, text, }): JSX.Element => {

	const classes = classNames(className);

	return (
		<Button
			type="submit"
			variant="success"
			className={classes}
			iconName="save">
				{
					typeof text === "undefined" ? "Сохранить" : text
				}
		</Button>
	);
};