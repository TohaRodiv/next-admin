import { AppLayout } from "#templates/app-layout";
import { BackTop, Button, ConfigProvider, } from "antd";
import type { AppProps } from "next/app"
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, } from "react";
import NProgress from "nprogress";
import { NextPage } from "next";
import "#styles/style.scss";
import { CaretUpOutlined } from "@ant-design/icons";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}


function App({ Component, pageProps }: AppPropsWithLayout) {

	const router = useRouter();

	useEffect(() => {

		const handleStart = () => {
			NProgress.start();
		}

		const handleStop = () => {
			NProgress.done();
		}

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		}

	}, []);

	const pageLayout = (page: ReactElement) => page;
	const appLayout = ((page: ReactElement) => <AppLayout>{page}</AppLayout>);

	const getLayout = Component.getLayout ? pageLayout : appLayout;

	return (
		<ConfigProvider>
			{getLayout(<Component {...pageProps} />)}
			<BackTop>
				<Button
					size="large"
					type="default"
					icon={<CaretUpOutlined />} />
			</BackTop>
		</ConfigProvider>
	);
}

export default App;