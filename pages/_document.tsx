import { Html, Head, Main, NextScript } from 'next/document'
import { DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  // 从页面props中获取locale，如果没有则默认为en
  const locale = props.__NEXT_DATA__?.locale || 'en';
  
  return (
    <Html lang={locale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}