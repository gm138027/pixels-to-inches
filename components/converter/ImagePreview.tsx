import React from 'react';
import Image from 'next/image'; // 导入Next.js优化的Image组件

interface ImagePreviewProps {
  imageUrl: string;
  fileName: string;
}

export default function ImagePreview({ imageUrl, fileName }: ImagePreviewProps) {
  return (
    <div className="w-64 h-64 border-2 border-neutral-300 bg-neutral-50 flex items-center justify-center relative">
      {/* 内层容器，通过设置具体尺寸来确保四边都有 2px 的空间 */}
      <div className="relative" style={{width: 'calc(100% - 4px)', height: 'calc(100% - 4px)'}}>
        <Image
          src={imageUrl}
          alt={fileName}
          fill
          className="object-contain"
          unoptimized // 由于是动态生成的blob URL，需要禁用优化
        />
      </div>
    </div>
  );
}