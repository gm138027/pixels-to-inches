# 翻译键验证机制

本项目实现了完整的翻译键验证机制，确保翻译的完整性和一致性，同时不影响生产环境性能。

## 🎯 功能特性

### ✅ 开发时验证
- **实时检查**：在开发环境中实时检查翻译键是否存在
- **控制台警告**：缺失的翻译键会在浏览器控制台显示警告
- **智能建议**：提供可用翻译键的建议
- **零性能影响**：验证代码在生产环境中被完全移除

### 🏗️ 构建时验证
- **自动检查**：构建前自动验证所有翻译键
- **构建阻止**：发现缺失翻译键时阻止构建
- **详细报告**：生成完整的验证报告
- **跳过选项**：提供跳过验证的构建选项

### 📊 类型安全
- **自动生成**：从翻译文件自动生成 TypeScript 类型
- **编译时检查**：在编译时检查翻译键的正确性
- **IDE 支持**：提供自动补全和类型提示

## 🚀 使用方法

### 基本命令

```bash
# 验证翻译键
npm run validate:i18n

# 生成类型定义
npm run generate:types

# 构建（包含验证）
npm run build

# 跳过验证的构建
npm run build:skip-validation

# 监听模式验证
npm run validate:i18n:watch
```

### 开发环境使用

```typescript
// 正确使用
const t = useTranslations('converter');
t('pixels'); // ✅ 如果存在

// 错误使用
t('nonexistentKey'); // ❌ 控制台会显示警告
```

### 类型安全使用

```typescript
import type { TranslationKey, TranslationNamespace } from '../types/translations';

// 类型安全的翻译键
const key: TranslationKey = 'converter.pixels'; // ✅
const invalidKey: TranslationKey = 'invalid.key'; // ❌ TypeScript 错误
```

## 📁 文件结构

```
├── scripts/
│   ├── validate-translations.js     # 翻译验证脚本
│   └── generate-translation-types.js # 类型生成脚本
├── types/
│   └── translations.ts              # 自动生成的类型定义
├── public/locales/
│   └── en/
│       ├── common.json              # 通用翻译
│       ├── privacy.json             # 隐私页面翻译
│       └── terms.json               # 条款页面翻译
├── i18n.config.js                   # 验证配置文件
└── docs/
    └── i18n-validation.md           # 本文档
```

## ⚙️ 配置选项

### 验证配置 (i18n.config.js)

```javascript
module.exports = {
  validation: {
    buildTime: true,        // 构建时验证
    development: true,      // 开发时验证
    production: false,      // 生产环境验证（始终为 false）
    failOnMissing: true,    // 缺失键时构建失败
    maxMissingKeys: 0       // 允许的最大缺失键数量
  }
};
```

### 性能保证

```typescript
// 开发环境
if (process.env.NODE_ENV === 'development') {
  validateTranslationKey(key, messages); // 执行验证
}

// 生产环境
// 验证代码被构建工具完全移除，零性能影响
```

## 📊 验证报告示例

```
🔍 Translation Validation Report
================================

✅ Valid Keys: 266
❌ Missing Keys: 53
⚠️  Unused Keys: 60
📊 Total Checked: 319

❌ Missing Keys:
================
  - converter.newFeature
    Used in: components/converter/NewComponent.tsx:45

⚠️  Unused Keys:
================
  en:
    - converter.oldFeature
    - common.deprecatedText

📈 Translation Coverage: 83.4%
```

## 🔧 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 临时跳过验证
   npm run build:skip-validation
   
   # 查看详细错误
   npm run validate:i18n
   ```

2. **类型错误**
   ```bash
   # 重新生成类型
   npm run generate:types
   ```

3. **缓存问题**
   ```bash
   # 清除缓存
   rm -rf .cache/i18n
   rm -rf .next
   ```

## 🎯 最佳实践

### 1. 翻译键命名
```typescript
// ✅ 好的命名
'converter.pixels'
'seo.pageTitle'
'common.copySuccess'

// ❌ 避免的命名
'text1'
'label'
'msg'
```

### 2. 命名空间使用
```typescript
// ✅ 使用命名空间
const t = useTranslations('converter');
t('pixels');

// ❌ 避免全局键
const t = useTranslations();
t('converter.pixels');
```

### 3. 参数化翻译
```typescript
// 翻译文件
{
  "welcome": "Welcome, {name}!"
}

// 使用
t('welcome', { name: 'John' });
```

## 🚀 性能优化

### 生产环境优化
- 验证代码在生产环境中被完全移除
- 类型信息在编译后不存在
- 翻译文件按需加载
- 零运行时性能影响

### 开发环境优化
- 缓存验证结果
- 增量验证
- 并行处理
- 智能建议算法

## 📈 监控和维护

### 定期检查
```bash
# 每日验证
npm run validate:i18n

# 生成覆盖率报告
npm run validate:i18n > coverage-report.txt
```

### CI/CD 集成
```yaml
# GitHub Actions 示例
- name: Validate translations
  run: npm run validate:i18n

- name: Build with validation
  run: npm run build
```

## 🔮 未来扩展

- [ ] 多语言支持
- [ ] 自动翻译建议
- [ ] 翻译质量检查
- [ ] 可视化管理界面
- [ ] 翻译进度跟踪
