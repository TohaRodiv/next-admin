import "#styles/style.scss";
import type { AppProps } from "next/dist/next-server/lib/router/router";
import { NextPage } from "next";
import React from "react";
import { Layout } from "#skeleton/Layout";
import { SettingProvider } from "src/context";


type TProps = AppProps


const Application: NextPage<TProps> = ({ Component, pageProps, }: TProps): JSX.Element => {

	return (
		<SettingProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SettingProvider>
	);
};

export default Application;