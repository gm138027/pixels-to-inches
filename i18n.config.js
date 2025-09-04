/**
 * 国际化验证配置文件
 * 配置翻译键验证的行为和规则
 */

module.exports = {
  // 翻译文件配置
  locales: {
    // 支持的语言列表
    supported: ['en', 'fr'],
    // 默认语言
    default: 'en',
    // 翻译文件目录
    directory: 'public/locales'
  },

  // 验证配置
  validation: {
    // 是否在构建时验证
    buildTime: true,
    // 是否在开发时验证
    development: true,
    // 是否在生产环境验证（应该始终为 false）
    production: false,
    // 验证失败时是否阻止构建
    failOnMissing: true,
    // 是否显示未使用的键警告
    warnOnUnused: true,
    // 最大允许的缺失键数量（0 表示不允许任何缺失）
    maxMissingKeys: 0
  },

  // 源代码扫描配置
  scanning: {
    // 要扫描的文件模式
    include: [
      'pages/**/*.{ts,tsx}',
      'components/**/*.{ts,tsx}',
      'lib/**/*.{ts,tsx}'
    ],
    // 要排除的文件模式
    exclude: [
      'node_modules/**',
      '.next/**',
      '**/*.test.*',
      '**/*.spec.*',
      'coverage/**'
    ],
    // 翻译函数名称模式
    translationFunctions: [
      't',
      'useTranslations'
    ]
  },

  // 类型生成配置
  typeGeneration: {
    // 是否启用类型生成
    enabled: true,
    // 输出文件路径
    outputFile: 'types/translations.ts',
    // 是否在构建前自动生成
    generateOnBuild: true
  },

  // 报告配置
  reporting: {
    // 报告详细程度 ('minimal', 'normal', 'verbose')
    verbosity: 'normal',
    // 是否显示建议
    showSuggestions: true,
    // 是否显示覆盖率统计
    showCoverage: true,
    // 未使用键的最大显示数量
    maxUnusedKeysShown: 10
  },

  // 开发环境配置
  development: {
    // 是否在控制台显示缺失键警告
    showMissingKeyWarnings: true,
    // 是否显示可用键建议
    showKeySuggestions: true,
    // 警告消息前缀
    warningPrefix: '🔍',
    // 是否启用实时验证
    liveValidation: false
  },

  // 性能配置
  performance: {
    // 是否启用缓存
    enableCache: true,
    // 缓存目录
    cacheDirectory: '.cache/i18n',
    // 是否并行处理文件
    parallel: true
  },

  // 自动修复配置
  autoFix: {
    // 是否启用自动修复建议
    enabled: false,
    // 是否自动添加缺失的键到翻译文件
    addMissingKeys: false,
    // 是否自动移除未使用的键
    removeUnusedKeys: false
  }
};
