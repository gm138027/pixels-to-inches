import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'
import { NextIntlClientProvider } from 'next-intl'
import type { AbstractIntlMessages } from 'next-intl'
import { useEffect, useState } from 'react'

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
  // 使用更宽松的类型定义来支持复杂的嵌套翻译结构
  const [messages, setMessages] = useState<any | null>(null);

  useEffect(() => {
    // 动态加载并合并多个翻译文件
    const loadAllTranslations = async () => {
      try {
        // 加载主翻译文件
        const mainTranslations = await import('../public/locales/en.json');

        // 加载其他翻译文件
        const privacyTranslations = await import('../public/locales/privacy-en.json');
        const termsTranslations = await import('../public/locales/terms-en.json');

        // 合并所有翻译
        const mergedMessages = {
          ...mainTranslations.default,
          privacy: privacyTranslations.default,
          terms: termsTranslations.default
        };

        setMessages(mergedMessages);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };

    loadAllTranslations();
  }, []);

  // 只在客户端初始化性能监控
  if (typeof window !== 'undefined') {
    // 监控各项Core Web Vitals指标
    onCLS(sendToAnalytics);  // 累积布局偏移（Cumulative Layout Shift）
    onINP(sendToAnalytics);  // 交互延迟（Interaction to Next Paint）
    onFCP(sendToAnalytics);  // 首次内容绘制（First Contentful Paint）
    onLCP(sendToAnalytics);  // 最大内容绘制（Largest Contentful Paint）
    onTTFB(sendToAnalytics); // 首字节时间（Time to First Byte）
  }

  if (!messages) {
    // 在翻译文件加载前显示简单的加载指示器
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-neutral-800 rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <NextIntlClientProvider
      locale="en"
      messages={messages}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}