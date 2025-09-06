import { Html, Head, Main, NextScript } from 'next/document'
import { DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  // 从页面props中获取locale，如果没有则默认为en
  const locale = props.__NEXT_DATA__?.locale || 'en';

  return (
    <Html lang={locale}>
      <Head>
        {/* Google Analytics - 最简单的实现 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P9Z09C23H1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-P9Z09C23H1', {
                send_page_view: true,
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}