import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'
import { NextIntlClientProvider } from 'next-intl'
import { AnalyticsProvider } from '../components/analytics/AnalyticsProvider'

// Web Vitals性能监控函数
function sendToAnalytics(metric: {
  name: string;
  value: number;
  rating: string;
  delta: number;
}) {
  // 在开发环境中输出到控制台
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', {
      name: metric.name,     // 指标名称（LCP, INP, CLS等）
      value: metric.value,   // 指标值
      rating: metric.rating, // 评级（good, needs-improvement, poor）
      delta: metric.delta,   // 与上次测量的差值
    });
  }

  // 生产环境中可以发送到分析服务
  // 例如：Google Analytics, 自定义监控服务等
  // analytics.track('Web Vitals', metric);
}

export default function App({ Component, pageProps }: AppProps) {
  // 只在客户端初始化性能监控
  if (typeof window !== 'undefined') {
    // 监控各项Core Web Vitals指标
    onCLS(sendToAnalytics);  // 累积布局偏移（Cumulative Layout Shift）
    onINP(sendToAnalytics);  // 交互延迟（Interaction to Next Paint）
    onFCP(sendToAnalytics);  // 首次内容绘制（First Contentful Paint）
    onLCP(sendToAnalytics);  // 最大内容绘制（Largest Contentful Paint）
    onTTFB(sendToAnalytics); // 首字节时间（Time to First Byte）
  }

  // 使用服务端渲染的翻译，通过pageProps传递messages
  return (
    <AnalyticsProvider>
      <NextIntlClientProvider 
        locale={pageProps.locale || 'en'}
        messages={pageProps.messages || {}}
      >
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </AnalyticsProvider>
  );
}