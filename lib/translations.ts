/**
 * 简化的翻译系统 - 使用 Next.js 内置 i18n
 * 替代 next-intl，提供相同的功能但更轻量
 */

import { createContext, useContext, useCallback } from 'react';

// 翻译上下文类型
interface TranslationContextType {
  messages: Record<string, unknown>;
  locale: string;
}

// 创建翻译上下文
export const TranslationContext = createContext<TranslationContextType>({
  messages: {},
  locale: 'en'
});

/**
 * 开发环境翻译键验证
 * 只在开发环境运行，生产环境会被构建工具移除
 */
const warnedKeys = new Set<string>(); // 缓存已警告的键，避免重复警告

function validateTranslationKey(key: string, messages: Record<string, unknown>): void {
  // 只在开发环境运行验证
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // 避免重复警告同一个键
  if (warnedKeys.has(key)) {
    return;
  }

  const value = getNestedValue(messages, key);
  if (value === undefined) {
    warnedKeys.add(key); // 标记为已警告
    console.warn(`🔍 Missing translation key: "${key}"`);

    // 提供可能的建议
    const parts = key.split('.');
    if (parts.length > 1) {
      const namespace = parts[0];
      const namespaceObj = messages[namespace];
      if (namespaceObj && typeof namespaceObj === 'object') {
        const availableKeys = Object.keys(namespaceObj).slice(0, 5); // 只显示前5个
        console.warn(`   Available keys in "${namespace}":`, availableKeys);
      }
    }
  }
}

/**
 * 获取嵌套对象的值
 * 支持 "seo.pageTitle" 或 "seo.faq.questions.0.question" 这样的路径
 */
export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  if (!obj || !path) return undefined;
  
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current === null || current === undefined) return undefined;
    if (typeof current === 'object' && current !== null) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * 简单的参数替换函数
 * 支持 {key} 格式的参数替换
 */
export function interpolateString(template: string, params: Record<string, unknown>): string {
  if (!params || typeof template !== 'string') return template;
  
  return Object.entries(params).reduce(
    (text, [key, value]) => text.replace(new RegExp(`{${key}}`, 'g'), String(value)),
    template
  );
}

/**
 * 翻译 Hook - 替代 next-intl 的 useTranslations
 * 
 * @param namespace 可选的命名空间，如 'seo', 'converter' 等
 * @returns 翻译函数
 */
export function useTranslations(namespace?: string) {
  const { messages } = useContext(TranslationContext);

  // 使用 useCallback 确保函数引用稳定
  return useCallback((key: string, params?: Record<string, unknown>) => {
    // 构建完整的翻译键路径
    const fullKey = namespace ? `${namespace}.${key}` : key;

    // 开发环境验证翻译键（生产环境此函数为空操作）
    validateTranslationKey(fullKey, messages);

    // 获取翻译值
    const value = getNestedValue(messages, fullKey);

    // 如果找不到翻译，返回键名
    if (value === undefined || value === null) {
      return key; // 回退到键名
    }

    // 如果是字符串且有参数，进行参数替换
    if (typeof value === 'string' && params) {
      return interpolateString(value, params);
    }

    // 确保返回字符串类型
    return typeof value === 'string' ? value : String(value);
  }, [messages, namespace]);
}

/**
 * 加载翻译文件的工具函数
 * 支持新的目录结构：public/locales/en/common.json
 */
export async function loadMessages(locale: string = 'en'): Promise<Record<string, unknown>> {
  try {
    // 在服务器端使用 fs 读取文件，避免缓存问题
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const path = await import('path');

      const commonPath = path.join(process.cwd(), 'public', 'locales', locale, 'common.json');
      const privacyPath = path.join(process.cwd(), 'public', 'locales', locale, 'privacy.json');
      const termsPath = path.join(process.cwd(), 'public', 'locales', locale, 'terms.json');

      const [commonData, privacyData, termsData] = await Promise.all([
        fs.promises.readFile(commonPath, 'utf-8').then(JSON.parse).catch(() => ({})),
        fs.promises.readFile(privacyPath, 'utf-8').then(JSON.parse).catch(() => ({})),
        fs.promises.readFile(termsPath, 'utf-8').then(JSON.parse).catch(() => ({}))
      ]);

      // 合并所有翻译
      const messages = {
        ...commonData,
        privacy: privacyData,
        terms: termsData
      };

      return messages;
    } else {
      // 客户端使用动态导入
      const [commonMessages, privacyMessages, termsMessages] = await Promise.all([
        import(`../public/locales/${locale}/common.json`).catch(() => ({ default: {} })),
        import(`../public/locales/${locale}/privacy.json`).catch(() => ({ default: {} })),
        import(`../public/locales/${locale}/terms.json`).catch(() => ({ default: {} }))
      ]);

      // 合并所有翻译
      const messages = {
        ...commonMessages.default,
        privacy: privacyMessages.default,
        terms: termsMessages.default
      };

      return messages;
    }
  } catch (error) {
    console.error('Failed to load translation files:', error);
    return getFallbackMessages();
  }
}

/**
 * 回退翻译消息
 * 当翻译文件加载失败时使用
 */
function getFallbackMessages(): Record<string, unknown> {
  return {
    common: { copySuccess: "✓" },
    converter: {
      pixels: "pixels",
      inches: "Inches",
      ppi: "PPI",
      dpi: "DPI",
      copy: "copy"
    },
    seo: {
      pageTitle: "Convert pixels to inches online for free",
      pageDescription: "Free online pixels to inches converter",
      h1: "pixels to inches converter",
      h1Description: "Convert pixels to inches easily"
    },
    modeSelector: {
      forScreens: "For screens",
      forPrinters: "For printers"
    },
    imageUpload: {
      uploadImage: "Upload Image"
    },
    languageSelector: {
      selectLanguage: "Select language"
    },
    header: {
      homeAriaLabel: "Pixels to Inches Converter - Home",
      logoAlt: "Pixels to Inches Converter Logo"
    },
    footer: {
      description: "Free online pixels to inches converter",
      quickLinks: "Quick Links",
      features: "Features"
    }
  };
}

/**
 * 统一的 getStaticProps 配置
 * 替代之前的 getI18nStaticProps
 */
export async function getStaticPropsWithTranslations(locale: string = 'en') {
  try {
    const messages = await loadMessages(locale);

    return {
      props: {
        messages,
        locale
      }
    };
  } catch (error) {
    console.error('Error loading translations:', error);

    // 回退到默认消息
    const fallbackMessages = getFallbackMessages();

    return {
      props: {
        messages: fallbackMessages,
        locale: 'en'
      }
    };
  }
}

/**
 * 类型定义
 */
export type Locale = 'en'; // 未来可扩展：'en' | 'zh' | 'es'
export type TranslationFunction = (key: string, params?: Record<string, unknown>) => string;
