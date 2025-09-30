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

function getSiteUrl(locale: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  const normalized = base.replace(/\/$/, '')

  if (locale === DEFAULT_LOCALE) {
    return normalized
  }

  return `${normalized}/${locale}`
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

function generateUrlEntries() {
  const lastmod = getCurrentDate()

  const entries: string[] = []

  for (const route of ROUTES) {
    for (const locale of SUPPORTED_LOCALES) {
      const localeSiteUrl = getSiteUrl(locale)
      const href = route.path === '/' ? localeSiteUrl : `${localeSiteUrl}${route.path}`

      const alternates = SUPPORTED_LOCALES.map((altLocale) => {
        const altSiteUrl = getSiteUrl(altLocale)
        const altHref = route.path === '/' ? altSiteUrl : `${altSiteUrl}${route.path}`
        return `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altHref}" />`
      }).join('\n')

      const defaultHref = route.path === '/' ? getSiteUrl(DEFAULT_LOCALE) : `${getSiteUrl(DEFAULT_LOCALE)}${route.path}`

      const entry = `  <url>
    <loc>${href}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultHref}" />
  </url>`

      entries.push(entry)
    }
  }

  return entries.join('\n\n')
}

function generateSiteMap() {
  const urlEntries = generateUrlEntries()

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
