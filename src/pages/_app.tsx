import Head from "next/head";

import "@/styles/normalize.scss";
import "@/styles/global.scss";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { AppProvider } from "@/providers/app";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = useMemo(
    () => Component.getLayout ?? ((page: React.ReactElement) => page),
    [Component.getLayout]
  );

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>Wego Food Delivery</title>
        <meta property="og:title" content="Wego Food Delivery" />
        <meta name="twitter:title" content="Wego Food Delivery" />
        <meta
          name="description"
          content="Wego.com - The #1 Travel Booking Website For Flights & Hotel Deals"
        />
        <meta
          property="description"
          content="Wego.com - The #1 Travel Booking Website For Flights & Hotel Deals"
        />
        <meta
          property="og:description"
          content="Wego.com - The #1 Travel Booking Website For Flights & Hotel Deals"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>
    </>
  );
}
