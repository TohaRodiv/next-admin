import type { TAvailableCRUDPaths, TCategoryEntity } from "#services/swagger-parse/types";
import { Link } from "#components/atoms/Link";
import { excludeEntityPaths } from "#config/exclud-entity-paths";
import { List } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import { ButtonCreate } from "../entity-view/buttons";
import { SwaggerParseService } from "#services/swagger-parse";

type TProps = {
	categories: Array<TCategoryEntity & {
		availableCRUDPaths: TAvailableCRUDPaths
	}>
}

export const EntityList: React.FC<TProps> = ({ categories }): JSX.Element => {
	return (
		<>
			<List>
				{
					categories.map(({ title, path, availableCRUDPaths, }) => {
						const availableCRUD = SwaggerParseService.getAvailableCRUD(availableCRUDPaths);
						let categoryPath = "/entity";
						let pathToView = `${categoryPath}${path}`;

						Object
							.entries(excludeEntityPaths)
							.filter(([excludePath]) => excludePath === path)
							.forEach(([path, getNewPath]) => {
								if (typeof getNewPath === "function") {

									pathToView = getNewPath(path);

								} else {
									throw new Error(`Property "${getNewPath}" for path "${path}" is not a function!`);
								}
							});

						if (pathToView === null) {
							return null;
						}

						const titleElement =
							<Link href={pathToView} className="link">
								<ProfileOutlined className="link__icon" />
								<span className="link__text">{title}</span>
							</Link>;

						const actions = [];

						availableCRUD.getPathCreateOne && actions.push(
							<ButtonCreate path={availableCRUD.getPathCreateOne()} />
						);

						return (
							<List.Item
								key={path}
								actions={actions}>
								<List.Item.Meta
									title={titleElement} />
							</List.Item>
						);
					})
				}
			</List>
		</>
	);
};