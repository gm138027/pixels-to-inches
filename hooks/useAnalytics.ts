import { useCallback } from 'react';

interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // 发送到分析服务（如 Google Analytics、Mixpanel 等）
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.event, {
        event_category: event.category,
        event_action: event.action,
        event_label: event.label,
        value: event.value
      });
    }
    
    // 也可以发送到自定义后端
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) });
    
    console.log('Analytics Event:', event);
  }, []);

  return { trackEvent };
}; 