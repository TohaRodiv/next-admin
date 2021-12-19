import { APIFrontendService } from "#services/api-frontend/APIFrontendService";
import { TControllerPaths, TEntity } from "#services/swagger-parse/types";
import { RedoOutlined } from "@ant-design/icons";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { Button, message, Popconfirm } from "antd";
import classNames from "classnames";
import { SyntheticEvent } from "react";

type TProps = {
	controllerPath: TControllerPaths
	text?: string | boolean
	loading: boolean
	createQueryBuilder: () => RequestQueryBuilder
	onUpdate?: (entity: TEntity) => void
	onBeforeUpdate?: () => void
	className?: string
}

export const ButtonUpdateMany: React.FC<TProps> = ({
		className,
		controllerPath,
		text,
		onUpdate,
		loading,
		onBeforeUpdate,
		createQueryBuilder,
	}): JSX.Element => {

	const classes = classNames(className);

	const handleClick = async (e: SyntheticEvent) => {
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
			loading={loading}
			onClick={handleClick}
			size="large"
			className={classes}
			ghost
			type="primary"
			icon={<RedoOutlined />}>
			{typeof text === "undefined" ? "Обновить" : text}
		</Button>
	);
};