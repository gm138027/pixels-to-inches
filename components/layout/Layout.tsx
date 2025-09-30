import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslations } from '../../lib/translations';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const DEFAULT_SITE_URL = 'https://pixelstoinches.com';
const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  fr: 'fr_FR'
};

export default function Layout({
  children,
  title = 'Pixels to Inches - Free Online Tool',
  description = 'Free online pixels to inches converter. Instantly convert PX to IN with DPI/PPI support for screens and printers. No registration required.'
}: LayoutProps) {
  const router = useRouter();
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const siteUrl = configuredSiteUrl.replace(/\/$/, '');

  const locales = router.locales || ['en'];
  const defaultLocale = router.defaultLocale || locales[0];
  const activeLocale = router.locale || defaultLocale;

  const asPath = router.asPath.split('#')[0];
  const pathWithoutQuery = asPath.split('?')[0] || '/';

  const stripLocale = (path: string) => {
    if (!path.startsWith('/')) {
      return path || '/';
    }

    const segments = path.split('/');
    const maybeLocale = segments[1];

    if (locales.includes(maybeLocale)) {
      segments.splice(1, 1);
    }

    const stripped = segments.join('/') || '/';
    return stripped === '' ? '/' : stripped;
  };

  const basePath = stripLocale(pathWithoutQuery);
  const getPathForLocale = (locale: string) => {
    if (locale === defaultLocale) {
      return basePath;
    }

    return basePath === '/' ? `/${locale}` : `/${locale}${basePath}`;
  };

  const canonicalPath = getPathForLocale(defaultLocale);
  const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '' : canonicalPath}` || siteUrl;
  const ogImageUrl = `${siteUrl}/logo/android-chrome-512x512.png`;

  const alternateLinks = locales.map((locale) => {
    const localePath = getPathForLocale(locale);
    const href = `${siteUrl}${localePath === '/' ? '' : localePath}`;

    return { locale, href };
  });

  const t = useTranslations('seo');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* 移动端优化标识 */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Canonical URL - 动态生成当前页面的规范URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* hreflang标签 - 多语言支持 */}
        {alternateLinks.map(({ locale, href }) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={href} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        {/* Open Graph标签 - 用于社交媒体分享优化 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Pixels to Inches" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="Pixels to Inches - Free Online Tool" />
        <meta property="og:locale" content={OG_LOCALE_MAP[activeLocale] || OG_LOCALE_MAP.en} />
        {alternateLinks
          .filter(({ locale }) => locale !== activeLocale)
          .map(({ locale, href }) => (
            <meta key={`og-alt-${locale}`} property="og:locale:alternate" content={OG_LOCALE_MAP[locale] || locale} />
          ))}

        {/* Twitter Cards标签 - 用于Twitter分享优化 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content="Pixels to Inches - Free Online Tool" />

        {/* 其他SEO优化标签 */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="Pixels to Inches" />
        <meta name="keywords" content="pixels to inches, px to in, converter, calculator, DPI, PPI, design tool, web development" />

        {/* 预加载关键资源 */}
        <link rel="preload" href="/logo/android-chrome-512x512.png" as="image" />

        {/* 预加载关键字体 - 改善LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* 关键CSS内联 - 改善LCP */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body{color:#171717;background:#fff;font-family:Arial,Helvetica,sans-serif}
            .container{max-width:1200px;margin:0 auto;padding:0 1rem}
            .btn-primary{background:#3b82f6;color:#fff;padding:0.75rem 1.5rem;border-radius:0.5rem;border:none;cursor:pointer}
            .btn-primary:hover{background:#2563eb}
            .animate-fadeIn{animation:fadeIn 0.5s ease-in-out}
            @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
          `
          }}
        />

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
              "name": t('webApp.name'),
              "url": canonicalUrl,
              "description": description,
              "applicationCategory": t('webApp.category'),
              "operatingSystem": t('webApp.operatingSystem'),
              "offers": {
                "@type": "Offer",
                "price": t('webApp.price'),
                "priceCurrency": t('webApp.currency')
              },
              "creator": {
                "@type": "Organization",
                "name": t('webApp.creator'),
                "url": siteUrl
              },
              "featureList": t('webApp.features'),
              "browserRequirements": t('webApp.browserRequirements'),
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": '4.8',
                "ratingCount": '1000'
              }
            })
          }}
        />

        {/* BreadcrumbList结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": 'Home',
                  "item": siteUrl
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        {/* 导航 */}
        <Header />

        {/* 主要内容区域 */}
        <main className="flex-1" role="main" aria-label="Pixels to Inches Converter">
          {children}
        </main>

        {/* 页脚 */}
        <Footer />
      </div>
    </>
  );
}