import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * 专门处理翻译相关错误的错误边界组件
 * 当翻译键缺失或翻译文件加载失败时，提供优雅的降级
 */
export class TranslationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // 检查是否是翻译相关的错误
    const isTranslationError = 
      error.message.includes('translation') ||
      error.message.includes('locale') ||
      error.message.includes('i18n') ||
      error.message.includes('intl');

    if (isTranslationError) {
      return { hasError: true, error };
    }

    // 如果不是翻译错误，让其他错误边界处理
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Translation error caught:', error, errorInfo);
    
    // 在开发环境中提供更详细的错误信息
    if (process.env.NODE_ENV === 'development') {
      console.group('Translation Error Details');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.groupEnd();
    }
  }

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义回退组件，使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认回退UI
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Translation Error
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Some text may not display correctly due to a translation issue.</p>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-2">
                    <summary className="cursor-pointer">Error details</summary>
                    <pre className="mt-1 text-xs bg-yellow-100 p-2 rounded overflow-auto">
                      {this.state.error.message}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * 高阶组件：为组件添加翻译错误处理
 */
export function withTranslationErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WithTranslationErrorBoundary = (props: P) => (
    <TranslationErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </TranslationErrorBoundary>
  );

  WithTranslationErrorBoundary.displayName = 
    `withTranslationErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithTranslationErrorBoundary;
}

/**
 * 安全的翻译函数，提供回退值
 */
export function createSafeTranslationFunction() {
  // 返回一个安全的翻译函数
  return (key: string, values?: Record<string, unknown>) => {
    // 尝试从回退值中获取翻译
    const fallbackTranslations: Record<string, string> = {
      'pixels': 'pixels',
      'inches': 'Inches',
      'copy': 'Copy',
      'copySuccess': '✓',
      'uploadImage': 'Upload Image',
      'selectLanguage': 'Select language',
      'forScreens': 'For screens',
      'forPrinters': 'For printers',
    };

    const fallbackValue = fallbackTranslations[key] || key;

    // 简单的变量替换
    if (values) {
      return Object.entries(values).reduce(
        (text, [placeholder, value]) =>
          text.replace(new RegExp(`{${placeholder}}`, 'g'), String(value)),
        fallbackValue
      );
    }

    return fallbackValue;
  };
}
