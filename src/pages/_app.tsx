import "antd/dist/antd.css";
import "#styles/style.scss";
import type { AppProps } from "next/dist/next-server/lib/router/router";
import { NextPage } from "next";
import React from "react";
import { SettingProvider } from "src/context";
import { AntdLayout } from "#components/skeleton/Layout/AntdLayout";


type TProps = AppProps;

const Application: NextPage<TProps> = ({ Component, pageProps, }: TProps): JSX.Element => {

	return (
		<SettingProvider>
			<AntdLayout>
				<Component {...pageProps} />
			</AntdLayout>
		</SettingProvider>
	);
};

export default Application;