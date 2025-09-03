#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * 翻译键验证脚本
 * 检查代码中使用的翻译键是否在翻译文件中存在
 */

// 配置
const CONFIG = {
  localesDir: 'public/locales',
  sourceGlob: '{pages,components,lib}/**/*.{ts,tsx}',
  supportedLocales: ['en'],
  excludePatterns: [
    'node_modules/**',
    '.next/**',
    '**/*.test.*',
    '**/*.spec.*'
  ]
};

// 颜色输出
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
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
      log('red', `❌ Error loading ${file}: ${error.message}`);
    }
  }
  
  return translations;
}

/**
 * 获取嵌套对象的值
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

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
 * 从源代码中提取翻译键使用
 */
function extractTranslationUsage() {
  const usage = [];
  const files = glob.sync(CONFIG.sourceGlob, { ignore: CONFIG.excludePatterns });

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    // 更精确的解析：找到每个 useTranslations 调用及其对应的变量名
    const useTranslationsMatches = [];
    const useTranslationsRegex = /const\s+(\w+)\s*=\s*useTranslations\(\s*(?:['"`]([^'"`]*?)['"`])?\s*\)/g;
    let match;

    while ((match = useTranslationsRegex.exec(content)) !== null) {
      const varName = match[1];
      const namespace = match[2] || null;
      useTranslationsMatches.push({ varName, namespace });
    }

    // 为每个翻译变量查找其调用
    for (const { varName, namespace } of useTranslationsMatches) {
      const tCallRegex = new RegExp(`\\b${varName}\\(\\s*['"\`]([^'"\`]*?)['"\`]`, 'g');
      let tMatch;

      while ((tMatch = tCallRegex.exec(content)) !== null) {
        const key = tMatch[1];
        const tLineNumber = content.substring(0, tMatch.index).split('\n').length;
        const fullKey = namespace ? `${namespace}.${key}` : key;

        usage.push({
          file,
          line: tLineNumber,
          key: fullKey,
          namespace,
          originalKey: key,
          varName
        });

        // 如果键包含数组索引（如 purposes.0），也标记父数组为已使用
        if (key.match(/\.\d+$/)) {
          const parentKey = key.replace(/\.\d+$/, '');
          const parentFullKey = namespace ? `${namespace}.${parentKey}` : parentKey;
          usage.push({
            file,
            line: tLineNumber,
            key: parentFullKey,
            namespace,
            originalKey: parentKey,
            varName,
            isArrayParent: true
          });
        }
      }
    }

    // 也匹配直接的翻译键使用（没有命名空间的情况）
    const directCallRegex = /useTranslations\(\)\s*\(\s*['"`]([^'"`]*?)['"`]/g;
    while ((match = directCallRegex.exec(content)) !== null) {
      const key = match[1];
      const lineNumber = content.substring(0, match.index).split('\n').length;

      usage.push({
        file,
        line: lineNumber,
        key,
        namespace: null,
        originalKey: key,
        varName: 't'
      });
    }
  }

  return usage;
}

/**
 * 验证翻译键
 */
function validateTranslations() {
  log('blue', '🔍 Starting translation validation...\n');
  
  const results = {
    totalKeys: 0,
    missingKeys: [],
    unusedKeys: [],
    validKeys: 0
  };
  
  // 加载翻译
  const translations = {};
  for (const locale of CONFIG.supportedLocales) {
    translations[locale] = loadTranslations(locale);
  }
  
  // 提取使用情况
  const usage = extractTranslationUsage();
  results.totalKeys = usage.length;
  
  log('blue', `📊 Found ${usage.length} translation key usages`);
  log('blue', `🌍 Checking ${CONFIG.supportedLocales.length} locale(s): ${CONFIG.supportedLocales.join(', ')}\n`);
  
  // 检查缺失的键
  for (const item of usage) {
    let found = false;
    
    for (const locale of CONFIG.supportedLocales) {
      const value = getNestedValue(translations[locale], item.key);
      if (value !== undefined) {
        found = true;
        break;
      }
    }
    
    if (found) {
      results.validKeys++;
    } else {
      results.missingKeys.push(item);
    }
  }
  
  // 检查未使用的键
  const usedKeys = new Set(usage.map(u => u.key));
  for (const locale of CONFIG.supportedLocales) {
    const allKeys = getAllKeys(translations[locale]);
    for (const key of allKeys) {
      if (!usedKeys.has(key)) {
        results.unusedKeys.push({ locale, key });
      }
    }
  }
  
  return results;
}

/**
 * 生成报告
 */
function generateReport(results) {
  log('bold', '📋 Translation Validation Report');
  log('bold', '================================\n');
  
  // 总览
  log('green', `✅ Valid Keys: ${results.validKeys}`);
  log('red', `❌ Missing Keys: ${results.missingKeys.length}`);
  log('yellow', `⚠️  Unused Keys: ${results.unusedKeys.length}`);
  log('blue', `📊 Total Checked: ${results.totalKeys}\n`);
  
  // 缺失的键
  if (results.missingKeys.length > 0) {
    log('red', '❌ Missing Keys:');
    log('red', '================');
    for (const item of results.missingKeys) {
      log('red', `  - ${item.key}`);
      log('red', `    Used in: ${item.file}:${item.line}`);
    }
    console.log();
  }
  
  // 未使用的键
  if (results.unusedKeys.length > 0) {
    log('yellow', '⚠️  Unused Keys:');
    log('yellow', '================');
    const groupedByLocale = results.unusedKeys.reduce((acc, item) => {
      if (!acc[item.locale]) acc[item.locale] = [];
      acc[item.locale].push(item.key);
      return acc;
    }, {});
    
    for (const [locale, keys] of Object.entries(groupedByLocale)) {
      log('yellow', `  ${locale}:`);
      for (const key of keys.slice(0, 10)) { // 只显示前10个
        log('yellow', `    - ${key}`);
      }
      if (keys.length > 10) {
        log('yellow', `    ... and ${keys.length - 10} more`);
      }
    }
    console.log();
  }
  
  // 覆盖率
  const coverage = results.totalKeys > 0 ? 
    ((results.validKeys / results.totalKeys) * 100).toFixed(1) : '100.0';
  
  log('blue', `📈 Translation Coverage: ${coverage}%`);
  
  return results.missingKeys.length === 0;
}

/**
 * 主函数
 */
function main() {
  try {
    const results = validateTranslations();
    const success = generateReport(results);
    
    if (success) {
      log('green', '\n🎉 All translation keys are valid!');
      process.exit(0);
    } else {
      log('red', '\n💥 Translation validation failed!');
      process.exit(1);
    }
  } catch (error) {
    log('red', `💥 Error during validation: ${error.message}`);
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { validateTranslations, loadTranslations };
