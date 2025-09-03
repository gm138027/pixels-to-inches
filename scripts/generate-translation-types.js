#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 生成翻译键的 TypeScript 类型定义
 * 提供编译时的类型安全检查
 */

// 配置
const CONFIG = {
  localesDir: 'public/locales',
  outputFile: 'types/translations.ts',
  defaultLocale: 'en'
};

/**
 * 获取对象的所有键路径
 */
function getAllKeys(obj, prefix = '') {
  const keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

/**
 * 加载翻译文件
 */
function loadTranslations(locale) {
  const translations = {};
  const localeDir = path.join(CONFIG.localesDir, locale);
  
  if (!fs.existsSync(localeDir)) {
    return translations;
  }
  
  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(localeDir, file), 'utf8'));
      const namespace = path.basename(file, '.json');
      
      if (namespace === 'common') {
        // common.json 的内容直接合并到根级别
        Object.assign(translations, content);
      } else {
        // 其他文件作为命名空间
        translations[namespace] = content;
      }
    } catch (error) {
      console.error(`Error loading ${file}: ${error.message}`);
    }
  }
  
  return translations;
}

/**
 * 生成类型定义字符串
 */
function generateTypeDefinitions(translations) {
  const allKeys = getAllKeys(translations);
  
  // 生成联合类型
  const keyUnion = allKeys
    .map(key => `  | '${key}'`)
    .join('\n');
  
  // 生成命名空间类型
  const namespaces = Object.keys(translations).filter(key => 
    typeof translations[key] === 'object' && translations[key] !== null
  );
  
  const namespaceUnion = namespaces.length > 0 
    ? namespaces.map(ns => `  | '${ns}'`).join('\n')
    : "  | 'common'";
  
  return `/**
 * 自动生成的翻译类型定义
 * 请勿手动修改此文件
 * 
 * 生成时间: ${new Date().toISOString()}
 * 基于语言: ${CONFIG.defaultLocale}
 */

/**
 * 所有可用的翻译键
 */
export type TranslationKey =
${keyUnion};

/**
 * 所有可用的命名空间
 */
export type TranslationNamespace =
${namespaceUnion};

/**
 * 翻译函数类型
 */
export type TranslationFunction = (
  key: TranslationKey,
  params?: Record<string, unknown>
) => string;

/**
 * 带命名空间的翻译函数类型
 */
export type NamespacedTranslationFunction<T extends TranslationNamespace> = (
  key: T extends 'common' 
    ? TranslationKey 
    : TranslationKey extends \`\${T}.\${infer K}\` 
      ? K 
      : never,
  params?: Record<string, unknown>
) => string;

/**
 * useTranslations Hook 类型
 */
export interface UseTranslationsHook {
  (): TranslationFunction;
  <T extends TranslationNamespace>(namespace: T): NamespacedTranslationFunction<T>;
}

/**
 * 翻译统计信息
 */
export interface TranslationStats {
  totalKeys: ${allKeys.length};
  namespaces: ${namespaces.length};
  generatedAt: '${new Date().toISOString()}';
}
`;
}

/**
 * 确保目录存在
 */
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * 主函数
 */
function main() {
  try {
    console.log('🔧 Generating translation types...');
    
    // 加载翻译
    const translations = loadTranslations(CONFIG.defaultLocale);
    
    if (Object.keys(translations).length === 0) {
      console.warn('⚠️  No translations found, generating empty types');
    }
    
    // 生成类型定义
    const typeDefinitions = generateTypeDefinitions(translations);
    
    // 确保输出目录存在
    ensureDirectoryExists(CONFIG.outputFile);
    
    // 写入文件
    fs.writeFileSync(CONFIG.outputFile, typeDefinitions, 'utf8');
    
    console.log(`✅ Translation types generated: ${CONFIG.outputFile}`);
    console.log(`📊 Generated ${getAllKeys(translations).length} translation key types`);
    
  } catch (error) {
    console.error(`❌ Error generating types: ${error.message}`);
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { generateTypeDefinitions, loadTranslations };
