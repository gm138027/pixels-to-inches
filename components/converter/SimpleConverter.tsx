import React, { useState, useEffect } from 'react';
import { convertPixelsToInches, convertInchesToPixels } from '../../lib/conversion';
import { useTranslations } from 'next-intl'; // 导入翻译函数

interface SimpleConverterProps {
  onCopy: (text: string, type: string) => void;
  copied: string;
}

export default function SimpleConverter({ onCopy, copied }: SimpleConverterProps) {
  const [pixels, setPixels] = useState('');
  const [inches, setInches] = useState('');
  const [ppi, setPpi] = useState(96); // 独立的PPI状态
  const [activeInput, setActiveInput] = useState<'pixels' | 'inches' | null>(null); // 跟踪当前活跃的输入框
  const t = useTranslations(); // 获取翻译函数

  // 像素到英寸的实时转换计算（只有当像素是活跃输入时才更新英寸）
  useEffect(() => {
    if (pixels && ppi && !isNaN(parseFloat(pixels)) && activeInput === 'pixels') {
      const result = convertPixelsToInches(parseFloat(pixels), ppi);
      setInches(result.toFixed(4));
    }
  }, [pixels, ppi, activeInput]);

  // 英寸到像素的实时转换计算（只有当英寸是活跃输入时才更新像素）
  useEffect(() => {
    if (inches && ppi && !isNaN(parseFloat(inches)) && activeInput === 'inches') {
      const result = convertInchesToPixels(parseFloat(inches), ppi);
      setPixels(Math.round(result).toString());
    }
  }, [inches, ppi, activeInput]);

  const handlePixelsChange = (value: string) => {
    setActiveInput('pixels'); // 标记像素输入框为活跃状态
    setPixels(value);
    if (!value) {
      setInches('');
      setActiveInput(null); // 清空时重置活跃状态
    }
  };

  const handleInchesChange = (value: string) => {
    setActiveInput('inches'); // 标记英寸输入框为活跃状态
    setInches(value);
    if (!value) {
      setPixels('');
      setActiveInput(null); // 清空时重置活跃状态
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {/* Pixels 输入 */}
        <div>
          <label className="block text-lg font-medium text-neutral-900 mb-3 text-center" htmlFor="pixels-input">{t('converter.pixels')}</label>
          <div className="flex">
            <input
              id="pixels-input"
              type="number"
              value={pixels}
              onChange={(e) => handlePixelsChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-neutral-300 focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-center"
              placeholder=""
              aria-label={t('converter.enterPixelValue')}
            />
            <button
              onClick={() => onCopy(pixels, 'pixels')}
              className="px-4 py-2 bg-neutral-500 text-white hover:bg-neutral-600 transition-colors"
              disabled={!pixels}
              aria-label={t('converter.copyPixelValue')}
            >
              {copied === 'pixels' ? t('common.copySuccess') : t('converter.copy')}
            </button>
          </div>
        </div>

        {/* Inches 输入 */}
        <div>
          <label className="block text-lg font-medium text-neutral-900 mb-3 text-center" htmlFor="inches-input">{t('converter.inches')}</label>
          <div className="flex">
            <input
              id="inches-input"
              type="number"
              value={inches}
              onChange={(e) => handleInchesChange(e.target.value)}
              step="0.0001"
              className="flex-1 px-3 py-2 border border-neutral-300 focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-center"
              placeholder=""
              aria-label={t('converter.enterInchValue')}
            />
            <button
              onClick={() => onCopy(inches, 'inches')}
              className="px-4 py-2 bg-neutral-500 text-white hover:bg-neutral-600 transition-colors"
              disabled={!inches}
              aria-label={t('converter.copyInchValue')}
            >
              {copied === 'inches' ? t('common.copySuccess') : t('converter.copy')}
            </button>
          </div>
        </div>
      </div>

      {/* PPI 控制 */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <label className="block text-lg font-medium text-neutral-900 mb-3 text-center" htmlFor="ppi-input">{t('converter.ppi')}</label>
          <div className="relative">
            <input
              id="ppi-input"
              type="number"
              value={ppi}
              onChange={(e) => setPpi(parseFloat(e.target.value) || 96)}
              className="w-full pl-10 pr-8 py-2 border border-neutral-300 focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-center text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              min="1"
              max="2400"
              aria-label={t('converter.setPpiValue')}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
              <button
                onClick={() => setPpi(prev => Math.min(prev + 1, 2400))}
                className="text-neutral-400 hover:text-neutral-600 text-xs leading-none"
                aria-label={t('converter.increasePpi')}
              >
                ▲
              </button>
              <button
                onClick={() => setPpi(prev => Math.max(prev - 1, 1))}
                className="text-neutral-400 hover:text-neutral-600 text-xs leading-none"
                aria-label={t('converter.decreasePpi')}
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