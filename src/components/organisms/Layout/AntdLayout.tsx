import { UserOutlined, VideoCameraOutlined, UploadOutlined, LeftOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'

const { Header, Sider, Content, } = Layout;


function getSider(collapsed: boolean, setCollapsed) {
	return <Sider
		className="antd-layout__sider"
		collapsible
		collapsed={collapsed}
		onCollapse={setCollapsed}
		theme="dark">
		<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
			<Menu.Item key="1" icon={<UserOutlined />}>
				<Link href="/">Главная</Link>
			</Menu.Item>
			<Menu.Item key="2" icon={<VideoCameraOutlined />}>
				<Link href="/ui/ui">UI тесты</Link>
			</Menu.Item>
			<Menu.Item key="3" icon={<UploadOutlined />}>
				<Link href="/files/files">Файлы</Link>
			</Menu.Item>
		</Menu>
	</Sider>;
}


export const AntdLayout: React.FC = ({ children, }): JSX.Element => {

	const [sider, setSider] = useState(null);
	const [collapsed, setCollapsed] = useState(true);
	const router = useRouter();

	useEffect(() => {
		setSider(getSider(collapsed, setCollapsed));
	}, [collapsed]);

	return (
		<Layout className="antd-layout">
			{sider}
			<Layout>
				<Header className="antd-layout__header">
					{
						router.pathname != "/" && <Button
							onClick={() => { router.back() }}
							icon={<LeftOutlined />}
							type="primary"
							ghost>
							Назад
						</Button>
					}
				</Header>
				<Content className="antd-layout__content">{children}</Content>
			</Layout>
		</Layout>
	);
}