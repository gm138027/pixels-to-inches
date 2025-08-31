const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // URL结构配置
  trailingSlash: false, // 确保URL不带尾随斜杠
  
  // 启用实验性功能以获得更好的性能
  experimental: {
    // 启用优化的包导入
    optimizePackageImports: ['@headlessui/react'],
    // 启用Webpack 5的模块联邦
    webpackBuildWorker: true
  },
  
  // 图片优化配置
  images: {
    // 允许的图片域名（如果需要外部图片）
    domains: [],
    // 图片格式优化 - 现代化格式优先
    formats: ['image/webp', 'image/avif'],
    // 启用响应式图片
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 压缩配置
  compress: true,
  
  // Webpack优化配置
  webpack: (config, { dev, isServer }) => {
    // 生产环境优化
    if (!dev && !isServer) {
      // 启用更激进的代码分割
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // 自定义headers - 用于SEO和安全优化
  async headers() {
    return [
      {
        // 应用到所有页面
        source: '/(.*)',
        headers: [
          // 基本安全headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // SEO相关headers
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
      {
        // 静态资源缓存策略
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // favicon缓存
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ]
  },
  
  // 重定向配置（如果需要）
  async redirects() {
    return [
      // 示例：将/home重定向到主页
      // {
      //   source: '/home',
      //   destination: '/',
      //   permanent: true,
      // },
    ]
  },
};

module.exports = withNextIntl(nextConfig);