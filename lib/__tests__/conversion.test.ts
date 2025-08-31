/**
 * 转换函数单元测试
 * 测试像素到英寸、英寸到像素的转换准确性
 */

import { 
  convertPixelsToInches, 
  convertInchesToPixels, 
  getDefaultDensity,
  DENSITY_PRESETS 
} from '../conversion';

describe('像素到英寸转换函数测试', () => {
  // 基础转换测试
  test('96像素在96DPI下应该等于1英寸', () => {
    const result = convertPixelsToInches(96, 96);
    expect(result).toBe(1);
  });

  test('300像素在300DPI下应该等于1英寸', () => {
    const result = convertPixelsToInches(300, 300);
    expect(result).toBe(1);
  });

  test('100像素在96DPI下应该约等于1.0417英寸', () => {
    const result = convertPixelsToInches(100, 96);
    expect(result).toBeCloseTo(1.0416666666666667, 10);
  });

  // 边界值测试
  test('0像素应该等于0英寸', () => {
    const result = convertPixelsToInches(0, 96);
    expect(result).toBe(0);
  });

  test('负数像素应该抛出错误', () => {
    expect(() => convertPixelsToInches(-1, 96)).toThrow('Invalid input: pixels cannot be negative and density must be greater than 0');
  });

  test('0或负数DPI应该抛出错误', () => {
    expect(() => convertPixelsToInches(100, 0)).toThrow('Invalid input: pixels cannot be negative and density must be greater than 0');
    expect(() => convertPixelsToInches(100, -1)).toThrow('Invalid input: pixels cannot be negative and density must be greater than 0');
  });
});

describe('英寸到像素转换函数测试', () => {
  // 基础转换测试
  test('1英寸在96DPI下应该等于96像素', () => {
    const result = convertInchesToPixels(1, 96);
    expect(result).toBe(96);
  });

  test('1英寸在300DPI下应该等于300像素', () => {
    const result = convertInchesToPixels(1, 300);
    expect(result).toBe(300);
  });

  test('2.5英寸在150DPI下应该等于375像素', () => {
    const result = convertInchesToPixels(2.5, 150);
    expect(result).toBe(375);
  });

  // 边界值测试
  test('0英寸应该等于0像素', () => {
    const result = convertInchesToPixels(0, 96);
    expect(result).toBe(0);
  });

  test('负数英寸应该抛出错误', () => {
    expect(() => convertInchesToPixels(-1, 96)).toThrow('Invalid input: inches cannot be negative and density must be greater than 0');
  });

  test('0或负数DPI应该抛出错误', () => {
    expect(() => convertInchesToPixels(1, 0)).toThrow('Invalid input: inches cannot be negative and density must be greater than 0');
    expect(() => convertInchesToPixels(1, -1)).toThrow('Invalid input: inches cannot be negative and density must be greater than 0');
  });
});

describe('往返转换测试 (像素→英寸→像素)', () => {
  test('往返转换应该保持数值一致', () => {
    const originalPixels = 150;
    const dpi = 96;
    
    // 像素 → 英寸 → 像素
    const inches = convertPixelsToInches(originalPixels, dpi);
    const backToPixels = convertInchesToPixels(inches, dpi);
    
    expect(backToPixels).toBeCloseTo(originalPixels, 10);
  });

  test('高DPI值往返转换测试', () => {
    const originalPixels = 1200;
    const dpi = 600;
    
    const inches = convertPixelsToInches(originalPixels, dpi);
    const backToPixels = convertInchesToPixels(inches, dpi);
    
    expect(backToPixels).toBeCloseTo(originalPixels, 10);
  });
});

describe('默认密度值测试', () => {
  test('screen模式应该返回96 PPI', () => {
    expect(getDefaultDensity('screen')).toBe(96);
  });

  test('print模式应该返回300 DPI', () => {
    expect(getDefaultDensity('print')).toBe(300);
  });
});

describe('预设密度值测试', () => {
  test('屏幕预设值应该正确', () => {
    expect(DENSITY_PRESETS.screen.standard).toBe(96);
    expect(DENSITY_PRESETS.screen.high).toBe(144);
    expect(DENSITY_PRESETS.screen.retina).toBe(192);
    expect(DENSITY_PRESETS.screen.ultra).toBe(288);
  });

  test('打印预设值应该正确', () => {
    expect(DENSITY_PRESETS.print.draft).toBe(150);
    expect(DENSITY_PRESETS.print.normal).toBe(300);
    expect(DENSITY_PRESETS.print.high).toBe(600);
    expect(DENSITY_PRESETS.print.photo).toBe(1200);
  });
});

describe('实际使用场景测试', () => {
  test('常见设计场景：iPhone屏幕尺寸计算', () => {
    // iPhone 14: 1170x2532像素，460 PPI
    const screenWidth = convertPixelsToInches(1170, 460);
    const screenHeight = convertPixelsToInches(2532, 460);
    
    expect(screenWidth).toBeCloseTo(2.54, 2); // 约2.54英寸
    expect(screenHeight).toBeCloseTo(5.5, 1);  // 约5.5英寸
  });

  test('打印场景：A4纸张300DPI计算', () => {
    // A4纸张：8.27 x 11.69英寸，300DPI
    const a4WidthPixels = convertInchesToPixels(8.27, 300);
    const a4HeightPixels = convertInchesToPixels(11.69, 300);
    
    expect(a4WidthPixels).toBeCloseTo(2481, 0);  // 2481像素
    expect(a4HeightPixels).toBeCloseTo(3507, 0); // 3507像素
  });
});