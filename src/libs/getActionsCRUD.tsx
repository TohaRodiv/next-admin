import { TAvailableCRUD, TControllerPaths, TEntity } from "#services/swagger-parse/types";
import { ButtonEdit, ButtonView, ButtonDelete } from "../components/app/entity-view/buttons";

type TProps = {
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
	id: number
	handleDelete: (entity: TEntity) => void
}

export const getActionsCRUD = ({ availableCRUD, controllerPath, id, handleDelete, }: TProps): JSX.Element[] => {

	const actions = [];

	if (availableCRUD.getPathUpdateOne) {
		actions.push(
			<ButtonEdit
				key="action-update-one"
				path={availableCRUD.getPathUpdateOne(id)}
				text={false} />
		);
	}

	if (availableCRUD.getPathGetOne) {
		actions.push(
			<ButtonView
				key="action-get-one"
				path={availableCRUD.getPathGetOne(id)}
				text={false} />
		);
	}

	if (availableCRUD.getPathDeleteOne) {
		actions.push(
			<ButtonDelete
				key="action-delete"
				controllerPath={controllerPath}
				entityId={id}
				text={false}
				onDelete={handleDelete} />
		);
	}

	return actions;
}