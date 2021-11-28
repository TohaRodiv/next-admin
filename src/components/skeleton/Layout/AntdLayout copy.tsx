import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Link from "next/link";
import React, { useState } from "react";

export const AntdLayout: React.FC = ({ children, }): JSX.Element => {

	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	}

	return (
		<Layout className="ant-layout-has-sider antd-site-layout">
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
					<Menu.Item key="1" icon={<UserOutlined />}>
						<Link href="/">Главная</Link>
					</Menu.Item>
					<Menu.Item key="2" icon={<VideoCameraOutlined />}>
						<Link href="/ui/ui">UI тест</Link>
					</Menu.Item>
					<Menu.Item key="3" icon={<UploadOutlined />}>
						<Link href="/files/files">Файлы</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }}>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: toggleCollapse,
					})}
				</Header>
				<Content
					className="site-layout-background"
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
					}} >
					{children}
				</Content>
			</Layout>
		</Layout>
	);
}