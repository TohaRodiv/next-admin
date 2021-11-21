import { TCategoryEntity } from "#services/swagger-parse/types";
import { Link } from "../../ui/Link";

type TProps = {
	categories: TCategoryEntity[]
}

export const EntityList: React.FC<TProps> = ({ categories }): JSX.Element => {
	return (
		<ul className="entity-list">
			{
				categories.map(({ title, path }) => {
					let categoryPath = "/entity";
					let pathToView = `${categoryPath}${path}`;
					
					switch (path) {
						case "/files":
							pathToView = `/files${path}`;
							break;

						default:
							pathToView = `${categoryPath}${path}`;
					}

					return (
						<li key={path} className="entity-list__item">
							<Link href={pathToView} className="entity-list__link">{title}</Link>
						</li>
					);
				})
			}
		</ul>
	);
};