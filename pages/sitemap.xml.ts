import { GetServerSideProps } from 'next'

// 网站的基础URL（生产环境中请替换为实际域名）
const SITE_URL = 'https://pixelstoinches.com'

// 获取当前日期的ISO字符串
function getCurrentDate() {
  return new Date().toISOString().split('T')[0]; // 只返回日期部分，如：2024-03-15
}

// 生成XML sitemap内容
function generateSiteMap() {
  const currentDate = getCurrentDate();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- 主页 -->
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- 隐私政策 -->
  <url>
    <loc>${SITE_URL}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- 服务条款 -->
  <url>
    <loc>${SITE_URL}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  
</urlset>`
}

// 此函数在每次请求时运行，生成动态sitemap
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // 生成XML sitemap内容
  const sitemap = generateSiteMap()

  // 设置响应头
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  // 设置缓存头，缓存24小时，提高SEO性能
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')
  // 添加安全头
  res.setHeader('X-Robots-Tag', 'noindex')
  
  // 写入响应
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

// 此组件不会被渲染，因为我们在getServerSideProps中直接返回XML
export default function SitemapXml() {
  // 此组件不会被渲染
  return null
}