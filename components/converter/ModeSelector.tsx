import React from 'react';
import Image from 'next/image'; // 导入Next.js优化的Image组件
import { ConversionMode } from '../../lib/conversion';
import { useTranslations } from '../../lib/translations'; // 导入翻译函数

interface ModeSelectorProps {
  selectedMode: ConversionMode;
  onModeChange: (mode: ConversionMode) => void;
}

export default function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
  const t = useTranslations('modeSelector'); // 获取模式选择器翻译函数

  return (
    <div className="flex border border-neutral-300 bg-white p-1 w-full">
      <button
        onClick={() => onModeChange('screen')}
        className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 text-lg font-medium transition-all duration-200 ${
          selectedMode === 'screen'
            ? 'bg-white text-black'
            : 'bg-neutral-500 text-white hover:bg-neutral-600'
        }`}
        aria-label={t('screenModeAriaLabel')}
        aria-pressed={selectedMode === 'screen'}
      >
        <Image
          src="/monitor.svg"
          alt={t('monitorAlt')}
          width={28}
          height={28}
          className="w-7 h-7"
        />
        <span>{t('forScreens')}</span>
      </button>

      <button
        onClick={() => onModeChange('print')}
        className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 text-lg font-medium transition-all duration-200 ${
          selectedMode === 'print'
            ? 'bg-white text-black'
            : 'bg-neutral-500 text-white hover:bg-neutral-600'
        }`}
        aria-label={t('printModeAriaLabel')}
        aria-pressed={selectedMode === 'print'}
      >
        <Image
          src="/print.svg"
          alt={t('printerAlt')}
          width={28}
          height={28}
          className="w-7 h-7"
        />
        <span>{t('forPrinters')}</span>
      </button>
    </div>
  );
}