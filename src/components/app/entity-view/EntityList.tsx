import { TCategoryEntity } from "#services/swagger-parse-service/types";
import { Link } from "../../ui/Link";

type TProps = {
	categories: TCategoryEntity[]
}

export const EntityList: React.FC<TProps> = ({ categories }): JSX.Element => {
	return (
		<ul>
			{
				categories.map(({ title, path }) => (
					<li key={path}>
						{/* TODO: Выводить путь из сервиса */}
						<Link href={`/entity${path}`}>{title}</Link>
					</li>
				))
			}
		</ul>
	);
};