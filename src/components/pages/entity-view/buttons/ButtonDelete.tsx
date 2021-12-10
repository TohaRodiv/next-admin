import { TButtonProps } from "#components/ui/Button/Button";
import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TControllerPaths, TEntity } from "#services/swagger-parse/types";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import classNames from "classnames";
import { SyntheticEvent } from "react";

type TProps = {
	controllerPath: TControllerPaths
	entityId: number
	text?: string | boolean
	onDelete?: (entity: TEntity) => void
	onBeforeDelete?: (entityId: number) => void
} & TButtonProps

export const ButtonDelete: React.FC<TProps> = ({
	className,
	controllerPath,
	entityId,
	text,
	onDelete,
	onBeforeDelete,
}): JSX.Element => {

	const classes = classNames(className);

	const handleClick = async (e: SyntheticEvent) => {
		onBeforeDelete && onBeforeDelete(entityId);
		const response = await APIFrontendService.deleteById(controllerPath, entityId);
		const result = await response.json();

		if (response.status === 200) {
			onDelete && onDelete(result);
			message.success("Запись успешно удалена!");
		} else {
			message.error(`Ошибка: ${result.statusCode} ${result.message}`)
		}

	};

	return (
		<Popconfirm
			title="Удалить?"
			onConfirm={handleClick}
			okText="Удалить"
			cancelText="Отменить">
			<Button
				size="large"
				className={classes}
				type="default"
				icon={<DeleteOutlined />}>
				{typeof text === "undefined" ? "Удалить" : text}
			</Button>
		</Popconfirm>
	);
};