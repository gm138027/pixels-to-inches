/**
 * 核心转换函数库
 * 包含像素与英寸转换功能
 * 支持屏幕模式（PPI）和打印模式（DPI）
 */

// 转换模式类型
export type ConversionMode = 'screen' | 'print';

/**
 * 将像素转换为英寸
 * @param pixels - 像素值
 * @param density - 密度值（PPI用于屏幕，DPI用于打印）
 * @returns 英寸值
 */
export function convertPixelsToInches(pixels: number, density: number): number {
  if (pixels < 0 || density <= 0) {
    throw new Error('Invalid input: pixels cannot be negative and density must be greater than 0');
  }
  return pixels / density;
}

/**
 * 将英寸转换为像素
 * @param inches - 英寸值
 * @param density - 密度值（PPI用于屏幕，DPI用于打印）
 * @returns 像素值
 */
export function convertInchesToPixels(inches: number, density: number): number {
  if (inches < 0 || density <= 0) {
    throw new Error('Invalid input: inches cannot be negative and density must be greater than 0');
  }
  return inches * density;
}

/**
 * 获取指定模式的默认密度值
 * @param mode - 转换模式
 * @returns 默认密度值（screen模式返回96 PPI，print模式返回300 DPI）
 */
export function getDefaultDensity(mode: ConversionMode): number {
  return mode === 'screen' ? 96 : 300;
}

/**
 * 密度值预设配置
 */
export const DENSITY_PRESETS = {
  screen: {
    standard: 96,    // 标准屏幕密度
    high: 144,       // 高分辨率屏幕
    retina: 192,     // Retina屏幕
    ultra: 288       // 超高分辨率屏幕
  },
  print: {
    draft: 150,      // 草稿质量
    normal: 300,     // 标准打印质量
    high: 600,       // 高质量打印
    photo: 1200      // 照片级打印
  }
} as const;