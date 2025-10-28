#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const i18nConfigPath = path.join(__dirname, '..', 'i18n.config.js');
const i18nConfig = fs.existsSync(i18nConfigPath) ? require(i18nConfigPath) : null;
const DEFAULT_LOCALE =
  (i18nConfig &&
    i18nConfig.locales &&
    typeof i18nConfig.locales.default === 'string' &&
    i18nConfig.locales.default.trim()) ||
  'en';
const SUPPORTED_LOCALES =
  (i18nConfig &&
    i18nConfig.locales &&
    Array.isArray(i18nConfig.locales.supported) &&
    i18nConfig.locales.supported.length > 0
      ? i18nConfig.locales.supported
      : [DEFAULT_LOCALE]).map((locale) => locale.trim());

/**
 * 鐢熸垚缈昏瘧閿殑 TypeScript 绫诲瀷瀹氫箟
 * 鎻愪緵缂栬瘧鏃剁殑绫诲瀷瀹夊叏妫€锟? */

// 閰嶇疆
const CONFIG = {
  localesDir: 'public/locales',
  outputFile: 'types/translations.ts',
  defaultLocale: DEFAULT_LOCALE,
  supportedLocales: SUPPORTED_LOCALES
};

/**
 * 鑾峰彇瀵硅薄鐨勬墍鏈夐敭璺緞
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
 * 鍔犺浇缈昏瘧鏂囦欢
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
        // common.json 鐨勫唴瀹圭洿鎺ュ悎骞跺埌鏍圭骇鍒?
        Object.assign(translations, content);
      } else {
        // 鍏朵粬鏂囦欢浣滀负鍛藉悕绌洪棿
        translations[namespace] = content;
      }
    } catch (error) {
      console.error(`Error loading ${file}: ${error.message}`);
    }
  }
  
  return translations;
}

/**
 * 娣卞害鍚堝苟缈昏瘧瀵硅薄锛岀‘淇濅换浣曡瑷€涓殑閿兘浼氳鏀跺綍
 */
function mergeDeep(target, source) {
  if (!source) return target;
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.prototype.toString.call(value) === '[object Object]'
    ) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      mergeDeep(target[key], value);
    } else {
      if (target[key] === undefined) {
        target[key] = value;
      }
    }
  }
  return target;
}

/**
 * 鐢熸垚绫诲瀷瀹氫箟瀛楃锟? */
function generateTypeDefinitions(translations) {
  const allKeys = getAllKeys(translations);
  
  // 鐢熸垚鑱斿悎绫诲瀷
  const keyUnion = allKeys
    .map(key => `  | '${key}'`)
    .join('\n');
  
  // 鐢熸垚鍛藉悕绌洪棿绫诲瀷
  const namespaces = Object.keys(translations).filter(key => 
    typeof translations[key] === 'object' && translations[key] !== null
  );
  
  const namespaceUnion = namespaces.length > 0 
    ? namespaces.map(ns => `  | '${ns}'`).join('\n')
    : "  | 'common'";
  
  return `/**
 * 鑷姩鐢熸垚鐨勭炕璇戠被鍨嬪畾锟? * 璇峰嬁鎵嬪姩淇敼姝ゆ枃锟? * 
 * 鐢熸垚鏃堕棿: ${new Date().toISOString()}
 * 鍩轰簬璇█: ${CONFIG.defaultLocale}
 */

/**
 * 鎵€鏈夊彲鐢ㄧ殑缈昏瘧锟? */
export type TranslationKey =
${keyUnion};

/**
 * 鎵€鏈夊彲鐢ㄧ殑鍛藉悕绌洪棿
 */
export type TranslationNamespace =
${namespaceUnion};

/**
 * 缈昏瘧鍑芥暟绫诲瀷
 */
export type TranslationFunction = (
  key: TranslationKey,
  params?: Record<string, unknown>
) => string;

/**
 * 甯﹀懡鍚嶇┖闂寸殑缈昏瘧鍑芥暟绫诲瀷
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
 * useTranslations Hook 绫诲瀷
 */
export interface UseTranslationsHook {
  (): TranslationFunction;
  <T extends TranslationNamespace>(namespace: T): NamespacedTranslationFunction<T>;
}

/**
 * 缈昏瘧缁熻淇℃伅
 */
export interface TranslationStats {
  totalKeys: ${allKeys.length};
  namespaces: ${namespaces.length};
  generatedAt: '${new Date().toISOString()}';
}
`;
}

/**
 * 纭繚鐩綍瀛樺湪
 */
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * 涓诲嚱锟? */
function main() {
  try {
    console.log('馃敡 Generating translation types...');
    
    // 鍔犺浇鎵€鏈夋敮鎸侀瑷€
    const translationsByLocale = {};
    for (const locale of CONFIG.supportedLocales) {
      translationsByLocale[locale] = loadTranslations(locale);
    }
    
    // 鎷ユ湁鎵€鏈夌殑閿紝纭繚绫诲瀷瀹氫箟鍏ㄩ儴鎵€鏈夛拷?
    const mergedTranslations = CONFIG.supportedLocales.reduce(
      (acc, locale) => mergeDeep(acc, translationsByLocale[locale]),
      {}
    );
    
    if (Object.keys(mergedTranslations).length === 0) {
      console.warn('鈿狅笍  No translations found, generating empty types');
    }
    
    // 鐢熸垚绫诲瀷瀹氫箟
    const typeDefinitions = generateTypeDefinitions(mergedTranslations);
    
    console.log('馃憞  Merged locales:', CONFIG.supportedLocales.join(', '));
    console.log('馃搱  Key count preview:', getAllKeys(mergedTranslations).length);
    // 纭繚杈撳嚭鐩綍瀛樺湪
    ensureDirectoryExists(CONFIG.outputFile);
    
    // 鍐欏叆鏂囦欢
    fs.writeFileSync(CONFIG.outputFile, typeDefinitions, 'utf8');
    
    console.log(`锟?Translation types generated: ${CONFIG.outputFile}`);
    console.log(`馃搳 Generated ${getAllKeys(mergedTranslations).length} translation key types across locales: ${CONFIG.supportedLocales.join(', ')}`);
    
  } catch (error) {
    console.error(`锟?Error generating types: ${error.message}`);
    process.exit(1);
  }
}

// 杩愯鑴氭湰
if (require.main === module) {
  main();
}

module.exports = { generateTypeDefinitions, loadTranslations };






