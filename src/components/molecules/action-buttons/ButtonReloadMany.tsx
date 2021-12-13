import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TControllerPaths, TEntity } from "#services/swagger-parse/types";
import { RedoOutlined } from "@ant-design/icons";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { Button, message } from "antd";
import { FC, } from "react";
import { TButtonActionProps } from "./types";

type TProps = {
	controllerPath: TControllerPaths
	createQueryBuilder: () => RequestQueryBuilder
	onUpdate?: (entity: TEntity) => void
	onBeforeUpdate?: () => void
}

const ButtonReloadMany: FC<TButtonActionProps & TProps & { loading: boolean }> = ({
	text,
	controllerPath,
	onBeforeUpdate,
	onUpdate,
	createQueryBuilder,
	children,
	...buttonProps
}): JSX.Element => {

	const reloadMany = async ({
		controllerPath,
		onBeforeUpdate,
		onUpdate,
		createQueryBuilder,
	}: TProps) => {
		const queryBuilder = createQueryBuilder && createQueryBuilder();
		onBeforeUpdate && onBeforeUpdate();
		const response = await APIFrontendService.getMany(controllerPath, queryBuilder);
		const result = await response.json();

		if (response.status === 200) {
			onUpdate && onUpdate(result);
			message.success("Данные обновленны!");
		} else {
			message.error(`Ошибка: ${result.statusCode} ${result.message}`)
		}
	};

	return (
		<Button
			onClick={() => {
				reloadMany({
					controllerPath,
					onBeforeUpdate,
					onUpdate,
					createQueryBuilder,
				});
			}}
			htmlType="button"
			{...buttonProps}>
			{children || text}
		</Button>
	);
};

ButtonReloadMany.defaultProps = {
	icon: <RedoOutlined />,
	type: "primary",
	ghost: true,
	text: "Обновить",
	size: "middle",
};

export { ButtonReloadMany };