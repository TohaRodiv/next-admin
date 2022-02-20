import { AppstoreOutlined, CodeSandboxOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider, { SiderProps } from "antd/lib/layout/Sider";
import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { AppLogo } from "#components/molecules/app-logo";
import SubMenu from "antd/lib/menu/SubMenu";
import { SwaggerDocParser } from "#libs/swagger-doc-parser";
import { Link } from "#components/atoms/link";
import { CRUDPath } from "#libs/crud-path";

type TProps = SiderProps & {
	className?: string,
};

const AppSider: FC<TProps> = ({
	className,
	...props
}) => {
	const [collapsed, setCollapsed] = useState(false);
	const [endpoints, setEndpoints] = useState([]);

	useEffect(() => {
		(async () => {
			const endpoints = await SwaggerDocParser.getEndpoints();
			setEndpoints(endpoints);
			console.log(endpoints);
		})();
	}, []);
	
	const classes = classNames(styles["app-sider"], className);

	return (
		<Sider
			width={250}
			className={classes}
			collapsible
			collapsed={collapsed}
			onCollapse={(collapsed) => { setCollapsed(collapsed) }}
			{...props}>
			<Menu
				className={styles["app-sider__menu"]}
				mode="inline"
				theme="dark"
				inlineCollapsed={collapsed}>
				<Menu.Item icon={<HomeOutlined />} key="home">
					<AppLogo withoutIcon />
				</Menu.Item>
				<SubMenu key="entities" title="Сущности" icon={<AppstoreOutlined />}>
					{
						endpoints.map(endpoint => (
							<Menu.Item key={endpoint.id} icon={<CodeSandboxOutlined />}>
								<Link href={CRUDPath.getPathFindAll(endpoint.path)}>{endpoint.title}</Link>
							</Menu.Item>
						))
					}
				</SubMenu>
				<Menu.Item icon={<SettingOutlined />} key="settings">Настройки</Menu.Item>
			</Menu>
		</Sider>
	);
};

export {
	AppSider
};