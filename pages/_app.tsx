import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'
import { AnalyticsProvider } from '../components/analytics/AnalyticsProvider'
import { ErrorBoundary } from 'react-error-boundary'
import { TranslationContext } from '../lib/translations'

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

// 错误回退组件
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-neutral-600 mb-4">
            We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <div className="space-y-2">
            <button
              onClick={resetErrorBoundary}
              className="w-full px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-neutral-100 text-neutral-900 rounded hover:bg-neutral-200 transition-colors"
            >
              Refresh page
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-neutral-500">
                Error details (development only)
              </summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  // 延迟初始化性能监控，避免影响LCP
  if (typeof window !== 'undefined') {
    // 使用setTimeout延迟监控初始化
    setTimeout(() => {
      // 监控各项Core Web Vitals指标
      onCLS(sendToAnalytics);  // 累积布局偏移（Cumulative Layout Shift）
      onINP(sendToAnalytics);  // 交互延迟（Interaction to Next Paint）
      onFCP(sendToAnalytics);  // 首次内容绘制（First Contentful Paint）
      onLCP(sendToAnalytics);  // 最大内容绘制（Largest Contentful Paint）
      onTTFB(sendToAnalytics); // 首字节时间（Time to First Byte）
    }, 1000); // 1秒后初始化
  }

  // 使用简化的翻译系统
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // 在生产环境中，可以将错误发送到监控服务
        console.error('Application error:', error, errorInfo);

        // 可以在这里添加错误追踪服务
        // 例如：Sentry, LogRocket, 等
        // errorTrackingService.captureException(error, { extra: errorInfo });
      }}
      onReset={() => {
        // 重置应用状态的逻辑
        window.location.reload();
      }}
    >
      <AnalyticsProvider>
        <TranslationContext.Provider
          value={{
            messages: pageProps.messages || {},
            locale: pageProps.locale || 'en'
          }}
        >
          <Component {...pageProps} />
        </TranslationContext.Provider>
      </AnalyticsProvider>
    </ErrorBoundary>
  );
}