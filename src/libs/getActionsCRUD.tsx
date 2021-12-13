import { ButtonDelete, ButtonEdit, ButtonView } from "#components/molecules/action-buttons";
import { TAvailableCRUD, TControllerPaths, TEntity } from "#services/swagger-parse/types";

type TProps = {
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
	id: number
	handleDelete: (entity: TEntity) => void
	onBeforeDelete?: (entityId: number) => void
}

export const getActionsCRUD = ({ availableCRUD, controllerPath, id, handleDelete, onBeforeDelete, }: TProps): JSX.Element[] => {

	const actions = [];

	if (availableCRUD.getPathDeleteOne) {
		actions.push(
			<ButtonDelete
				title="Удалить"
				danger
				key="action-delete"
				controllerPath={controllerPath}
				entityId={id}
				text={null}
				onDelete={handleDelete}
				onBeforeDelete={onBeforeDelete} />
		);
	}

	if (availableCRUD.getPathGetOne) {
		actions.push(
			<ButtonView
				title="Просмотр"
				key="action-get-one"
				path={availableCRUD.getPathGetOne(id)}
				text={null} />
		);
	}

	if (availableCRUD.getPathUpdateOne) {
		actions.push(
			<ButtonEdit
				title="Изменить"
				key="action-update-one"
				path={availableCRUD.getPathUpdateOne(id)}
				text={null} />
		);
	}

	return actions;
}