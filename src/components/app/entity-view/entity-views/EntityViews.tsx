import { TEntity, TSchemaEntity, TAvailableCRUD, TControllerPaths } from "#services/swagger-parse/types";
import { TSchemaCRUD } from "#types/TSchemaCRUD";
import { ButtonCreate} from "../buttons";
import { EntityViewsBody } from "./EntityViewsBody";
import { EntityViewsHead } from "./EntityViewsHead";

type TProps = {
	entities: TEntity[]
	caption: string
	schema: TSchemaEntity
	availableCRUD: TAvailableCRUD
	controllerPath: TControllerPaths
	CRUDSchema: TSchemaCRUD
}

export const EntityViews: React.FC<TProps> = ({ entities, schema, caption, availableCRUD, controllerPath, CRUDSchema, }): JSX.Element => {
	return (
		<>
			{
				availableCRUD.getPathCreateOne &&
				<ButtonCreate path={availableCRUD.getPathCreateOne()} />
			}
			<table className="entity-views">
				<caption className="entity-views__caption">{caption}</caption>
				<EntityViewsHead schema={schema} />
				<EntityViewsBody
					entities={entities}
					availableCRUD={availableCRUD}
					controllerPath={controllerPath}
					schema={schema}
					CRUDSchema={CRUDSchema} />
			</table>
		</>
	);
};