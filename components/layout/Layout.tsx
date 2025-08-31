import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ 
  children, 
  title = 'Pixels to Inches - Free Online Tool',
  description = 'Convert pixels to inches instantly with our advanced calculator. Features dual conversion modes, image analysis, and multiple DPI presets for screens and printers.'
}: LayoutProps) {
  const router = useRouter();
  const baseUrl = 'https://pixelstoinches.com';
  const currentUrl = `${baseUrl}${router.asPath}`;
  
  // 获取翻译函数
  const t = useTranslations();

  return (
    <>
      <Head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P9Z09C23H1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-P9Z09C23H1');
            `
          }}
        />
        
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Canonical URL - 动态生成当前页面的规范URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* hreflang标签 - 多语言支持 */}
        <link rel="alternate" hrefLang="en" href={currentUrl} />
        <link rel="alternate" hrefLang="x-default" href={currentUrl} />
        
        {/* Open Graph标签 - 用于社交媒体分享优化 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Pixels to Inches" />
        <meta property="og:image" content="https://pixelstoinches.com/logo/android-chrome-512x512.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="Pixels to Inches - Free Online Tool" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Cards标签 - 用于Twitter分享优化 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://pixelstoinches.com/logo/android-chrome-512x512.png" />
        <meta name="twitter:image:alt" content="Pixels to Inches - Free Online Tool" />
        
        {/* 其他SEO优化标签 */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Pixels to Inches" />
        <meta name="keywords" content="pixels to inches, px to in, converter, calculator, DPI, PPI, design tool, web development" />
        
        {/* Favicon配置 */}
        <link rel="icon" href="/logo/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* JSON-LD结构化数据 - 帮助搜索引擎理解网站内容 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": t('seo.webApp.name'),
              "url": baseUrl,
              "description": description,
              "applicationCategory": t('seo.webApp.category'),
              "operatingSystem": t('seo.webApp.operatingSystem'),
              "offers": {
                "@type": "Offer",
                "price": t('seo.webApp.price'),
                "priceCurrency": t('seo.webApp.currency')
              },
              "creator": {
                "@type": "Organization",
                "name": t('seo.webApp.creator'),
                "url": baseUrl
              },
              "featureList": t('seo.webApp.features'),
              "browserRequirements": t('seo.webApp.browserRequirements')
            })
          }}
        />
        

      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        {/* 导航栏 */}
        <Header />
        
        {/* 主要内容区域 */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* 页脚 */}
        <Footer />
      </div>
    </>
  );
}