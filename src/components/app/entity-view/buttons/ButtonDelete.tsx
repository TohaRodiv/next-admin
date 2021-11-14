import { Button } from "#components/ui/Button";
import { TButtonProps } from "#components/ui/Button/Button";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TControllerPaths, TEntity } from "#services/swagger-parse/types";
import classNames from "classnames";
import { SyntheticEvent } from "react";

type TProps = {
	controllerPath: TControllerPaths
	entityId: number
	text?: string | boolean
	onDelete?: (entity: TEntity) => void
} & TButtonProps

export const ButtonDelete: React.FC<TProps> = ({ className, controllerPath, entityId, text, onDelete, }): JSX.Element => {

	const classes = classNames(className);

	const handleClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
		if (confirm("Удалить?")) {
			const result = await APIFrontendService.deleteById(controllerPath, entityId);
			onDelete && onDelete(result);
		}
	};

	return (
		<Button
			variant="warning"
			className={classes}
			iconName="trash"
			onClick={handleClick}>
				{
					typeof text === "undefined" ? "Удалить" : text
				}
		</Button>
	);
};