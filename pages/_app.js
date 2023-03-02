import "../styles/globals.css";

import "../styles/ckcs.css";

import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/router";

import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo";

import Script from "next/script";

 function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 100,
    when: "afterChildren",
  };
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Голос молодежи</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="../images/favicon.ico" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KMXEPYRVLD"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-KMXEPYRVLD');
        `}
      </Script>

      <SessionProvider session={session}>
        <Header />

        <AnimatePresence>
          <div className="page-transition-wrapper">
            <motion.div
              transition={spring}
              key={router.pathname}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              id="page-transition-container"
            >
              <ApolloProvider client={client}>
                <Component {...pageProps} />
              </ApolloProvider>
            </motion.div>
          </div>
        </AnimatePresence>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default MyApp;
