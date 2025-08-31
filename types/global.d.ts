// 为 Google Analytics gtag 函数添加类型声明
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export {}; 