# 国际化配置统一指南

## 概述

本项目已统一国际化配置，所有页面都使用相同的配置模式，确保一致性和可维护性。

## 统一配置结构

### 1. 核心工具函数 (`lib/i18nUtils.ts`)

```typescript
import { getI18nStaticProps } from '../lib/i18nUtils';

// 在页面中使用
export async function getStaticProps() {
  return getI18nStaticProps();
}
```

### 2. 页面配置模式

所有页面都遵循以下统一模式：

```typescript
import React from 'react';
import Layout from '../components/layout/Layout';
import { useTranslations } from 'next-intl';
import { getI18nStaticProps } from '../lib/i18nUtils';

export default function PageName() {
  const t = useTranslations('namespace'); // 使用命名空间
  
  return (
    <Layout title={t('pageTitle')} description={t('pageDescription')}>
      {/* 页面内容 */}
    </Layout>
  );
}

// 统一的 getStaticProps
export async function getStaticProps() {
  return getI18nStaticProps();
}
```

## 已统一的页面

| 页面 | 状态 | 配置方式 |
|------|------|----------|
| `pages/index.tsx` | ✅ 已统一 | 使用 `getI18nStaticProps()` |
| `pages/privacy.tsx` | ✅ 已统一 | 使用 `getI18nStaticProps()` |
| `pages/terms.tsx` | ✅ 已统一 | 使用 `getI18nStaticProps()` |

## 配置优势

### 1. 一致性
- 所有页面使用相同的错误处理逻辑
- 统一的回退消息机制
- 一致的导入方式

### 2. 可维护性
- 集中管理国际化配置
- 减少重复代码
- 易于更新和修改

### 3. 错误处理
- 统一的错误日志记录
- 自动回退到默认消息
- 防止页面因翻译文件缺失而崩溃

### 4. 性能优化
- 统一的缓存策略
- 减少重复的翻译文件加载
- 优化的错误恢复机制

## 添加新页面

当添加新页面时，请遵循以下步骤：

1. **导入工具函数**
```typescript
import { getI18nStaticProps } from '../lib/i18nUtils';
```

2. **添加 getStaticProps**
```typescript
export async function getStaticProps() {
  return getI18nStaticProps();
}
```

3. **使用翻译**
```typescript
const t = useTranslations('pageNamespace');
```

## 错误处理

统一配置包含完整的错误处理：

- **翻译文件加载失败**: 自动回退到默认消息
- **网络错误**: 记录错误并继续运行
- **文件格式错误**: 提供友好的错误信息

## 测试

运行测试以验证配置：

```bash
npm test lib/__tests__/i18nUtils.test.ts
```

## 注意事项

1. 确保所有页面都使用 `getI18nStaticProps()`
2. 不要直接导入 `getMessages` 或 `defaultLocale`
3. 使用命名空间来组织翻译键
4. 定期运行测试确保配置正确

## 未来扩展

如需支持多语言，只需修改 `i18n.ts` 中的 `locales` 数组：

```typescript
export const locales = ['en', 'zh', 'es'] as const;
```

统一配置会自动处理多语言支持。 