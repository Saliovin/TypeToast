import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-3CFFDZN9NN" />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-3CFFDZN9NN');
                    `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
