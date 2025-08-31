import React from 'react';
import { type ImageInfo as ImageInfoType, formatFileSize } from '../../lib/imageAnalysis';
import { useTranslations } from 'next-intl'; // 导入翻译函数

interface ImageInfoProps {
  imageInfo: ImageInfoType;
}

export default function ImageInfo({ imageInfo }: ImageInfoProps) {
  const t = useTranslations(); // 获取翻译函数
  return (
    <div className="flex-1 space-y-4">
      <div className="space-y-3">
        <div className="text-neutral-700">
          {t('imageInfo.xResolution')}:{imageInfo.xResolution}<span className="text-sm">{t('imageInfo.dpi')}</span>
        </div>
        
        <div className="text-neutral-700">
          {t('imageInfo.yResolution')}:{imageInfo.yResolution}<span className="text-sm">{t('imageInfo.dpi')}</span>
        </div>
        
        <div className="text-neutral-700">
          {t('imageInfo.pixel')}:{imageInfo.width}x{imageInfo.height}<span className="text-sm">{t('imageInfo.pixels')}</span>
        </div>
        
        <div className="text-neutral-700">
          {t('imageInfo.size')}:{imageInfo.physicalWidth.toFixed(2)}x{imageInfo.physicalHeight.toFixed(2)}<span className="text-sm">{t('imageInfo.inches')}</span>
        </div>
        
        <div className="text-neutral-700">
          {t('imageInfo.fileSize')}:{(() => {
            const fileSize = formatFileSize(imageInfo.fileSize);
            const match = fileSize.match(/([0-9.]+)\s*([A-Za-z]+)/);
            if (match) {
              return <>{match[1]}<span className="text-sm">{match[2]}</span></>;
            }
            return fileSize;
          })()}
        </div>
      </div>
    </div>
  );
}