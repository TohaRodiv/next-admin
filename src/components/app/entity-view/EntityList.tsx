import { TCategoryEntity } from "#services/swagger-parse/types";
import { Link } from "../../ui/Link";

type TProps = {
	categories: TCategoryEntity[]
}

export const EntityList: React.FC<TProps> = ({ categories }): JSX.Element => {
	return (
		<ul className="entity-list">
			{
				categories.map(({ title, path }) => (
					<li key={path} className="entity-list__item">
						{/* TODO: Выводить путь из сервиса */}
						<Link href={`/entity${path}`} className="entity-list__link">{title}</Link>
					</li>
				))
			}
		</ul>
	);
};