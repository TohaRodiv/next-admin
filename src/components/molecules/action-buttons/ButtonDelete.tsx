import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TControllerPaths, TEntity } from "#services/swagger-parse/types";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import { FC, } from "react";
import { TButtonActionProps } from "./types";

type TProps = {
	controllerPath: TControllerPaths,
	entityId: number,
	onDelete?: (entity: TEntity) => void
	onBeforeDelete?: (entityId: number) => void
}

const ButtonDelete: FC<TButtonActionProps & TProps> = ({
	text,
	entityId,
	controllerPath,
	onDelete,
	onBeforeDelete,
	children,
	...buttonProps
}): JSX.Element => {

	const handleDelete = async ({
		entityId,
		controllerPath,
		onDelete,
		onBeforeDelete,
	}: TProps) => {
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
		<>
			<Popconfirm
				title="Удалить ?"
				onConfirm={() => {
					handleDelete({
						entityId,
						controllerPath,
						onDelete,
						onBeforeDelete,
					});
				}}
				okText="Удалить"
				cancelText="Отменить">
				<Button
					htmlType="button"
					{...buttonProps}>
					{children || text}
				</Button>
			</Popconfirm>
		</>
	);
};

ButtonDelete.defaultProps = {
	icon: <DeleteOutlined />,
	type: "primary",
	ghost: true,
	text: "Удалить",
	size: "middle",
};

export { ButtonDelete };