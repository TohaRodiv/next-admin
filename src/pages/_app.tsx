import "antd/dist/antd.css";
import "#styles/style.scss";
import type { AppProps } from "next/dist/next-server/lib/router/router";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { SettingProvider } from "src/context";
import { AntdLayout } from "#components/templates/antd-layout";
import NProgress from "nprogress";
import { useRouter } from "next/router";


type TProps = AppProps;

const Application: NextPage<TProps> = ({ Component, pageProps, }: TProps): JSX.Element => {

	const router = useRouter();

	useEffect(() => {


		const handleStart = (_url) => {
			NProgress.start()
		}

		const handleStop = () => {
			NProgress.done()
		}

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleStop)
		router.events.on('routeChangeError', handleStop)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleStop)
			router.events.off('routeChangeError', handleStop)
		}

	}, [router]);

	return (
		<SettingProvider>
			<AntdLayout>
				<Component {...pageProps} />
			</AntdLayout>
		</SettingProvider>
	);
};

export default Application;