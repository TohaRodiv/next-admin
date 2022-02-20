import { AppstoreOutlined, HomeOutlined, ProfileOutlined, SettingOutlined, UploadOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider, { SiderProps } from "antd/lib/layout/Sider";
import { FC, useState } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { AppLogo } from "#components/molecules/app-logo";
import SubMenu from "antd/lib/menu/SubMenu";

type TProps = SiderProps & {
	className?: string,
};

const AppSider: FC<TProps> = ({
	className,
	...props
}) => {
	const [collapsed, setCollapsed] = useState(false);
	const classes = classNames(styles["app-sider"], className);
	return (
		<Sider
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
					<Menu.Item>Товары</Menu.Item>
				</SubMenu>
				<Menu.Item icon={<SettingOutlined />} key="settings">Настройки</Menu.Item>
			</Menu>
		</Sider>
	);
};

export {
	AppSider
};