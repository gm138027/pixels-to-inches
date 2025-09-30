import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import type { DocumentProps } from "next/document";

const DEFAULT_GA_ID = "G-P9Z09C23H1";

export default function Document(props: DocumentProps) {
  const locale = props.__NEXT_DATA__?.locale || "en";
  const gaId = process.env.NEXT_PUBLIC_GA_ID || DEFAULT_GA_ID;

  return (
    <Html lang={locale}>
      <Head>
        {gaId && (
          <>
            <Script
              id="ga-loader"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script id="ga-inline" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  send_page_view: true,
                  anonymize_ip: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false
                });
              `}
            </Script>
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
