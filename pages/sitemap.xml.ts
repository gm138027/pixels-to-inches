import { GetServerSideProps } from 'next'

const DEFAULT_SITE_URL = 'https://pixelstoinches.com'
const SUPPORTED_LOCALES = ['en', 'fr'] as const
const DEFAULT_LOCALE = SUPPORTED_LOCALES[0]

interface RouteConfig {
  path: string
  changefreq: 'daily' | 'weekly' | 'monthly'
  priority: string
}

const ROUTES: RouteConfig[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/privacy', changefreq: 'monthly', priority: '0.3' },
  { path: '/terms', changefreq: 'monthly', priority: '0.3' }
]

function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  return configured.replace(/\/$/, '')
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

function buildPath(path: string, locale: typeof SUPPORTED_LOCALES[number]) {
  if (locale === DEFAULT_LOCALE) {
    return path === '/' ? '' : path
  }

  if (path === '/') {
    return `/${locale}`
  }

  return `/${locale}${path}`
}

function generateUrlEntry(baseUrl: string, route: RouteConfig, lastmod: string) {
  const defaultHref = `${baseUrl}${buildPath(route.path, DEFAULT_LOCALE)}`
  const alternateLinks = SUPPORTED_LOCALES.map((locale) => {
    const href = `${baseUrl}${buildPath(route.path, locale)}`
    return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}" />`
  }).join('\n')

  return `  <url>
    <loc>${defaultHref}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${alternateLinks}
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultHref}" />
  </url>`
}

function generateSiteMap() {
  const siteUrl = getSiteUrl()
  const lastmod = getCurrentDate()

  const urlEntries = ROUTES.map((route) => generateUrlEntry(siteUrl, route, lastmod)).join('\n\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')
  res.setHeader('X-Robots-Tag', 'noindex')

  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default function SitemapXml() {
  return null
}