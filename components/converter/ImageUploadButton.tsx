import React, { useRef } from 'react';
import { useTranslations } from '../../lib/translations'; // 导入翻译函数

interface ImageUploadButtonProps {
  onFileSelect: (file: File) => void;
}

export default function ImageUploadButton({ onFileSelect }: ImageUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('imageUpload'); // 获取图片上传翻译函数

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={triggerFileSelect}
        className="text-neutral-800 hover:text-neutral-900 underline"
      >
        {t('uploadImage')}
      </button>
    </>
  );
}