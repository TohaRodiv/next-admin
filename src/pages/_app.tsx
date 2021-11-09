import "#styles/style.scss";
import type { AppProps } from "next/dist/next-server/lib/router/router";
import { NextPage } from "next";
import React from "react";
import { Layout } from "#skeleton/Layout";


type TProps = AppProps


const Application: NextPage<TProps> = ({ Component, pageProps, }: TProps): JSX.Element => {

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
};

export default Application;