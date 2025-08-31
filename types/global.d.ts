// 为 Google Analytics gtag 函数添加类型声明
declare global {
  interface Window {
    gtag: (
      command: 'event',
      eventName: string,
      eventParameters: {
        event_category: string;
        event_action: string;
        event_label?: string;
        value?: number;
      }
    ) => void;
  }
}

export {}; 