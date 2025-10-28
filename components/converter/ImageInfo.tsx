import React from 'react';
import { type ImageInfo as ImageInfoType, formatFileSize } from '../../lib/imageAnalysis';
import { useTranslations } from '../../lib/translations'; // 导入翻译函数

interface ImageInfoProps {
  imageInfo: ImageInfoType;
}

export default function ImageInfo({ imageInfo }: ImageInfoProps) {
  const t = useTranslations('imageInfo'); // 获取图片信息翻译函数
  return (
    <div className="flex-1 space-y-4">
      <div className="space-y-3">
        <div className="text-neutral-700">
          {t('xResolution')}: {imageInfo.xResolution}<span className="text-sm"> {t('dpiUnit')}</span>
        </div>

        <div className="text-neutral-700">
          {t('yResolution')}: {imageInfo.yResolution}<span className="text-sm"> {t('dpiUnit')}</span>
        </div>
        
        <div className="text-neutral-700">
          {t('imageWidth')}: {imageInfo.width} x {imageInfo.height}<span className="text-sm"> {t('pixelsUnit')}</span>
        </div>
        
        <div className="text-neutral-700">
          {t('physicalSize')}: {imageInfo.physicalWidth.toFixed(2)}x{imageInfo.physicalHeight.toFixed(2)}<span className="text-sm"> {t('inchesUnit')}</span>
        </div>
        
        <div className="text-neutral-700">
          {t('fileSize')}:{(() => {
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




