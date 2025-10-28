# 国际化配置统一指南

## 概述

当前项目已经统一到基于 `lib/translations.ts` 的自研 i18n 方案。所有页面与组件都依赖同一套上下文、工具方法以及翻译校验脚本，从而保持一致的开发体验与可维护性。

## 统一配置结构

### 1. 核心工具方法（`lib/translations.ts`）

```typescript
import {
  useTranslations,
  getStaticPropsWithTranslations,
  type TranslationFunction
} from '../lib/translations';
```

- `useTranslations(namespace?)`：在函数组件中获取翻译函数。
- `getStaticPropsWithTranslations(locale?)`：在 `getStaticProps` 中注入翻译数据与当前语言。
- `TranslationContext`：在 `_app.tsx` 中由 `TranslationContext.Provider` 统一提供。

### 2. 页面标准用法

```typescript
import Layout from '../components/layout/Layout';
import { useTranslations, getStaticPropsWithTranslations } from '../lib/translations';

export default function PageName() {
  const t = useTranslations('namespace');

  return (
    <Layout title={t('pageTitle')} description={t('pageDescription')}>
      {/* 页面内容 */}
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return getStaticPropsWithTranslations(locale);
}
```

## 已对齐的页面

| 页面 | 状态 | 说明 |
|------|------|------|
| `pages/index.tsx` | ✅ 已对齐 | 使用 `getStaticPropsWithTranslations()` |
| `pages/privacy.tsx` | ✅ 已对齐 | 使用 `getStaticPropsWithTranslations()` |
| `pages/terms.tsx` | ✅ 已对齐 | 使用 `getStaticPropsWithTranslations()` |

## 统一方案优势

1. **一致性**：所有页面共享一致的错误处理、上下文注入与 Hook 使用方式。
2. **可维护性**：集中管理翻译加载逻辑与回退策略，修改一次即可全局生效。
3. **扩展性**：配合 `i18n.config.js` 可快速添加新语言并在脚本中自动生效。
4. **性能**：服务器端按需加载翻译文件，客户端通过上下文重用已加载数据。

## 新增页面指引

1. **导入工具方法**
   ```typescript
   import { useTranslations, getStaticPropsWithTranslations } from '../lib/translations';
   ```
2. **实现 `getStaticProps`**
   ```typescript
   export async function getStaticProps({ locale }) {
     return getStaticPropsWithTranslations(locale);
   }
   ```
3. **组件中使用翻译**
   ```typescript
   const t = useTranslations('pageNamespace');
   ```

## 错误处理

- 翻译文件加载失败时会自动回退到 `getFallbackMessages()`。
- 开发环境会在控制台输出缺失键警告（去重处理）。
- `TranslationErrorBoundary` 为关键区域提供兜底 UI。

## 测试与脚本

- **验证脚本**：`npm run validate:i18n`（覆盖所有受支持语言）。
- **类型生成**：`npm run generate:types`，确保翻译键与 TypeScript 类型保持同步。
- **单元测试**：`npm test lib/__tests__/i18nUtils.test.ts` 覆盖加载逻辑与回退策略。

## 配置要点

- `i18n.config.js` 控制支持语言、校验策略与类型生成路径。
- 翻译文件位于 `public/locales/<locale>/*.json`，命名对应命名空间。
- 新增语言时更新 `i18n.config.js` 的 `locales.supported`，校验与类型脚本会自动识别。

## 后续扩展

- ✅ 多语言校验脚本已支持所有受支持语言。
- 🔄 若需增加命名空间，统一在脚本与类型生成工具中维护。
- 🚀 可结合 CI 在构建阶段执行 `npm run validate:i18n` 与 `npm run generate:types`，保障翻译质量。
