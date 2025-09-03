/**
 * ESLint 配置 - 国际化规则
 * 提供翻译键的静态检查
 */

const fs = require('fs');
const path = require('path');

// 加载翻译文件以获取有效的键
function loadValidKeys() {
  try {
    const localesDir = path.join(__dirname, 'public/locales/en');
    const validKeys = new Set();
    
    if (fs.existsSync(localesDir)) {
      const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
      
      for (const file of files) {
        const content = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8'));
        const namespace = path.basename(file, '.json');
        
        function addKeys(obj, prefix = '') {
          for (const [key, value] of Object.entries(obj)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              addKeys(value, fullKey);
            } else {
              validKeys.add(fullKey);
              // 如果是 common 文件，也添加不带命名空间的键
              if (namespace === 'common') {
                validKeys.add(fullKey);
              } else {
                validKeys.add(`${namespace}.${fullKey}`);
              }
            }
          }
        }
        
        if (namespace === 'common') {
          addKeys(content);
        } else {
          addKeys(content, namespace);
        }
      }
    }
    
    return validKeys;
  } catch (error) {
    console.warn('Warning: Could not load translation keys for ESLint validation');
    return new Set();
  }
}

const validKeys = loadValidKeys();

module.exports = {
  rules: {
    // 自定义规则：检查翻译键是否存在
    'i18n/no-missing-keys': {
      create(context) {
        return {
          CallExpression(node) {
            // 检查 useTranslations() 调用
            if (
              node.callee.type === 'Identifier' &&
              node.callee.name === 'useTranslations'
            ) {
              // 这是 useTranslations 调用，我们需要跟踪返回的函数调用
              return;
            }
            
            // 检查 t() 调用
            if (
              node.callee.type === 'Identifier' &&
              node.callee.name === 't' &&
              node.arguments.length > 0 &&
              node.arguments[0].type === 'Literal' &&
              typeof node.arguments[0].value === 'string'
            ) {
              const key = node.arguments[0].value;
              
              // 在开发环境检查键是否存在
              if (process.env.NODE_ENV !== 'production' && !validKeys.has(key)) {
                context.report({
                  node: node.arguments[0],
                  message: `Translation key "${key}" not found in translation files`,
                  suggest: [
                    {
                      desc: `Add "${key}" to translation files`,
                      fix: function(fixer) {
                        // 这里可以提供自动修复建议
                        return [];
                      }
                    }
                  ]
                });
              }
            }
          }
        };
      }
    }
  }
};
