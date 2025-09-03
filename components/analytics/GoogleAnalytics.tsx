import Script from 'next/script';

interface GoogleAnalyticsProps {
  gaId: string;
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  // 只在生产环境且有有效GA ID时加载
  if (process.env.NODE_ENV !== 'production' || !gaId) {
    return null;
  }

  // 生成包含正确GA ID的脚本
  const analyticsScript = `
    // 轻量级分析初始化
    window.analyticsQueue = window.analyticsQueue || [];

    // 延迟加载完整的Google Analytics
    function loadAnalytics() {
      if (window.gtag) return; // 已加载

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=${gaId}';
      script.onload = function() {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', '${gaId}', {
          // 优化配置
          send_page_view: true,
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });

        // 处理队列中的事件
        window.analyticsQueue.forEach(event => window.gtag('event', event.name, event.params));
        window.analyticsQueue = [];
      };
      document.head.appendChild(script);
    }

    // 用户交互后加载
    ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
      document.addEventListener(event, loadAnalytics, { once: true, passive: true });
    });

    // 5秒后自动加载（备用）
    setTimeout(loadAnalytics, 5000);
  `;

  return (
    <>
      {/* 轻量级分析 - 延迟到用户交互后加载 */}
      <Script
        id="analytics-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: analyticsScript
        }}
      />
    </>
  );
}
