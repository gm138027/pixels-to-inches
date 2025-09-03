// 为 Google Analytics gtag 函数添加类型声明
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    analyticsQueue?: Array<{
      name: string;
      params: Record<string, unknown>;
    }>;
  }

  // requestIdleCallback 类型声明
  function requestIdleCallback(
    callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
    options?: { timeout?: number }
  ): number;
}

export {};