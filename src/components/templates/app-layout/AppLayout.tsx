import { Layout } from "antd";
import { BasicProps, } from "antd/lib/layout/layout";
import React from "react";
import { FC } from "react";
import styles from "./style.module.scss";
import { AppHeader } from "#organisms/app-header";
import { AppContent } from "#organisms/app-content";
import Head from "next/head";
import { AppSider } from "#components/organisms/app-sider";

type TProps = BasicProps & {}

const AppLayout: FC<TProps> = ({
	children,
	...props
}) => {
	return (
		<>
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
				<link rel="shortcut icon" href="/favicons/favicon.ico" />
				<meta name="apple-mobile-web-app-title" content="Electronly - Бизнес" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="application-name" content="Electronly - Бизнес" />
				<meta name="msapplication-TileColor" content="#000000" />
				<meta name="msapplication-config" content="/browserconfig.xml" />
				<meta name="theme-color" content="#000000" />
			</Head>
			<Layout {...props} className={styles["app-layout"]} hasSider>
				<AppSider />
				<Layout className={styles["app-layout__sider"]}>
					{/* <AppHeader
						className={styles["app-layout__header"]} /> */}
					<AppContent
						className={styles["app-layout__main"]}>
						{children}
					</AppContent>
				</Layout>
			</Layout>
		</>
	);
}

export { AppLayout };