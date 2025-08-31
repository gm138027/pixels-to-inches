import React, { useState, useEffect } from 'react';
import { convertPixelsToInches, convertInchesToPixels } from '../../lib/conversion';
import { useTranslations } from 'next-intl'; // 导入翻译函数

interface DimensionConverterProps {
  onCopy: (text: string, type: string) => void;
  copied: string;
}

export default function DimensionConverter({ onCopy, copied }: DimensionConverterProps) {
  const [widthPx, setWidthPx] = useState('');
  const [heightPx, setHeightPx] = useState('');
  const [widthIn, setWidthIn] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [dpi, setDpi] = useState(300); // 独立的DPI状态
  const [activeInput, setActiveInput] = useState<'pixels' | 'inches' | null>(null); // 跟踪当前活跃的输入类型
  const t = useTranslations(); // 获取翻译函数

  // 像素到英寸的实时转换计算（只有当像素是活跃输入时才更新英寸）
  useEffect(() => {
    if (activeInput === 'pixels') {
      if (widthPx && dpi && !isNaN(parseFloat(widthPx))) {
        const result = convertPixelsToInches(parseFloat(widthPx), dpi);
        setWidthIn(result.toFixed(4));
      }
      if (heightPx && dpi && !isNaN(parseFloat(heightPx))) {
        const result = convertPixelsToInches(parseFloat(heightPx), dpi);
        setHeightIn(result.toFixed(4));
      }
    }
  }, [widthPx, heightPx, dpi, activeInput]);

  // 英寸到像素的实时转换计算（只有当英寸是活跃输入时才更新像素）
  useEffect(() => {
    if (activeInput === 'inches') {
      if (widthIn && dpi && !isNaN(parseFloat(widthIn))) {
        const result = convertInchesToPixels(parseFloat(widthIn), dpi);
        setWidthPx(Math.round(result).toString());
      }
      if (heightIn && dpi && !isNaN(parseFloat(heightIn))) {
        const result = convertInchesToPixels(parseFloat(heightIn), dpi);
        setHeightPx(Math.round(result).toString());
      }
    }
  }, [widthIn, heightIn, dpi, activeInput]);

  const handleWidthPxChange = (value: string) => {
    setActiveInput('pixels'); // 标记像素输入为活跃状态
    setWidthPx(value);
    if (!value) {
      setWidthIn('');
      // 如果两个像素输入都为空，则重置活跃状态
      if (!value && !heightPx) setActiveInput(null);
    }
  };

  const handleHeightPxChange = (value: string) => {
    setActiveInput('pixels'); // 标记像素输入为活跃状态
    setHeightPx(value);
    if (!value) {
      setHeightIn('');
      // 如果两个像素输入都为空，则重置活跃状态
      if (!widthPx && !value) setActiveInput(null);
    }
  };

  const handleWidthInChange = (value: string) => {
    setActiveInput('inches'); // 标记英寸输入为活跃状态
    setWidthIn(value);
    if (!value) {
      setWidthPx('');
      // 如果两个英寸输入都为空，则重置活跃状态
      if (!value && !heightIn) setActiveInput(null);
    }
  };

  const handleHeightInChange = (value: string) => {
    setActiveInput('inches'); // 标记英寸输入为活跃状态
    setHeightIn(value);
    if (!value) {
      setHeightPx('');
      // 如果两个英寸输入都为空，则重置活跃状态
      if (!widthIn && !value) setActiveInput(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* 像素尺寸行 */}
      <div className="grid grid-cols-2 gap-6 relative">
        <div>
          <label className="block text-lg font-medium text-neutral-900 mb-3 text-center" htmlFor="width-px-input">{t('converter.widthPx')}</label>
          <input
            id="width-px-input"
            type="number"
            value={widthPx}
            onChange={(e) => handleWidthPxChange(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-center"
            aria-label={t('converter.enterWidthPixels')}
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-neutral-900 mb-3 text-center" htmlFor="height-px-input">{t('converter.heightPx')}</label>
          <div className="flex items-center space-x-2">
            <input
              id="height-px-input"
              type="number"
              value={heightPx}
              onChange={(e) => handleHeightPxChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-neutral-300 focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-center"
              aria-label={t('converter.enterHeightPixels')}
            />
            <button
              onClick={() => onCopy(`${widthPx}x${heightPx}`, 'dimensions-px')}
              className="px-4 py-2 bg-neutral-500 text-white hover:bg-neutral-600 transition-colors"
              disabled={!widthPx || !heightPx}
              aria-label={t('converter.copyPixelDimensions')}
            >
              {copied === 'dimensions-px' ? t('common.copySuccess') : t('converter.copy')}
            </button>
          </div>
        </div>
        {/* X字符定位在两个输入框的交汇点 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-10" style={{top: 'calc(100% - 36px)'}}>
          <span className="text-lg font-medium text-neutral-900 bg-neutral-50 px-2">x</span>
        </div>
      </div>

      {/* 英寸尺寸行 */}
      <div className="grid grid-cols-2 gap-6 relative">
        <div>
          <label className="block text-lg font-medium text-neutral-900 mb-3 text-center" htmlFor="width-in-input">{t('converter.widthIn')}</label>
          <input
            id="width-in-input"
            type="number"
            value={widthIn}
            onChange={(e) => handleWidthInChange(e.target.value)}
            step="0.0001"
            className="w-full px-3 py-2 border border-neutral-300 focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-center"
            aria-label={t('converter.enterWidthInches')}
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-neutral-900 mb-3 text-center" htmlFor="height-in-input">{t('converter.heightIn')}</label>
          <div className="flex items-center space-x-2">
            <input
              id="height-in-input"
              type="number"
              value={heightIn}
              onChange={(e) => handleHeightInChange(e.target.value)}
              step="0.0001"
              className="flex-1 px-3 py-2 border border-neutral-300 focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-center"
              aria-label={t('converter.enterHeightInches')}
            />
            <button
              onClick={() => onCopy(`${widthIn}x${heightIn}`, 'dimensions-in')}
              className="px-4 py-2 bg-neutral-500 text-white hover:bg-neutral-600 transition-colors"
              disabled={!widthIn || !heightIn}
              aria-label={t('converter.copyInchDimensions')}
            >
              {copied === 'dimensions-in' ? t('common.copySuccess') : t('converter.copy')}
            </button>
          </div>
        </div>
        {/* X字符定位在两个输入框的交汇点 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-10" style={{top: 'calc(100% - 36px)'}}>
          <span className="text-lg font-medium text-neutral-900 bg-neutral-50 px-2">x</span>
        </div>
      </div>

      {/* DPI 控制 */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <label className="block text-lg font-medium text-neutral-900 mb-3 text-center" htmlFor="dpi-input">{t('converter.dpi')}</label>
          <div className="relative">
            <input
              id="dpi-input"
              type="number"
              value={dpi}
              onChange={(e) => setDpi(parseFloat(e.target.value) || 300)}
              className="w-full pl-10 pr-8 py-2 border border-neutral-300 focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-center text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              min="1"
              max="2400"
              aria-label={t('converter.setDpiValue')}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
              <button
                onClick={() => setDpi(prev => Math.min(prev + 1, 2400))}
                className="text-neutral-400 hover:text-neutral-600 text-xs leading-none"
                aria-label={t('converter.increaseDpi')}
              >
                ▲
              </button>
              <button
                onClick={() => setDpi(prev => Math.max(prev - 1, 1))}
                className="text-neutral-400 hover:text-neutral-600 text-xs leading-none"
                aria-label={t('converter.decreaseDpi')}
              >
                ▼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}