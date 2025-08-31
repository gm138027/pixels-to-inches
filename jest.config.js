const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // 提供Next.js应用的路径，这将启用加载next.config.js和.env文件
  dir: './',
});

// 自定义Jest配置
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '<rootDir>/lib/__tests__/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/components/__tests__/**/*.test.{js,jsx,ts,tsx}',
  ],
  collectCoverageFrom: [
    'lib/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
  ],
};

// createJestConfig是异步导出的，这样可以等待next/jest加载Next.js配置
module.exports = createJestConfig(customJestConfig);