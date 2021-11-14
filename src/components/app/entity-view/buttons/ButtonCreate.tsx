import { Button } from "#components/ui/Button";
import { TButtonProps } from "#components/ui/Button/Button";
import classNames from "classnames";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";

type TProps = {
	path: string
	text?: string | boolean
} & TButtonProps

export const ButtonCreate: React.FC<TProps> = ({ className, path, text, }): JSX.Element => {

	const classes = classNames(className);
	const router = useRouter();

	const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
		router.push(path);
	};

	return (
		<Button
			variant="success"
			className={classes}
			iconName="folder-plus"
			onClick={handleClick}>
				{
					typeof text === "undefined" ? "Добавить" : text
				}
		</Button>
	);
};