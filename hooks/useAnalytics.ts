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
    if (typeof window === 'undefined') return;

    // 如果Google Analytics已加载，直接发送
    if (window.gtag) {
      window.gtag('event', event.event, {
        event_category: event.category,
        event_action: event.action,
        event_label: event.label,
        value: event.value
      });
    }

    // 开发环境记录日志
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }, []);

  return { trackEvent };
};