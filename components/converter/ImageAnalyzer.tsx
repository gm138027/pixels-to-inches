import React, { useState, useEffect, useRef } from 'react';
import ImagePreview from './ImagePreview';
import ImageInfo from './ImageInfo';
import {
  extractImageInfo,
  createImagePreviewUrl,
  revokeImagePreviewUrl,
  ImageInfo as ImageInfoType
} from '../../lib/imageAnalysis';
import { useTranslations } from '../../lib/translations';

interface ImageAnalyzerProps {
  selectedFile: File | null;
}

export default function ImageAnalyzer({ selectedFile }: ImageAnalyzerProps) {
  const [imageInfo, setImageInfo] = useState<ImageInfoType | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const t = useTranslations('imageAnalyzer');
  const imageUrlRef = useRef<string>('');

  useEffect(() => {
    if (!selectedFile) {
      if (imageUrlRef.current) {
        revokeImagePreviewUrl(imageUrlRef.current);
        setImageUrl('');
        imageUrlRef.current = '';
      }
      setImageInfo(null);
      setError('');
      return;
    }

    setIsExpanded(true);

    const processFile = async () => {
      setError('');

      try {
        const previewUrl = createImagePreviewUrl(selectedFile);
        setImageUrl(previewUrl);
        imageUrlRef.current = previewUrl;

        const info = await extractImageInfo(selectedFile);
        setImageInfo(info);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : t('analysisError');
        setError(errorMessage);
        setImageUrl((currentUrl) => {
          if (currentUrl) {
            revokeImagePreviewUrl(currentUrl);
          }
          imageUrlRef.current = '';
          return '';
        });
        setImageInfo(null);
      }
    };

    processFile();
  }, [selectedFile, t]);

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) {
        revokeImagePreviewUrl(imageUrlRef.current);
      }
    };
  }, []);

  if (!imageInfo && !error) {
    return null;
  }

  if (!isExpanded) {
    return null;
  }

  return (
    <div className="bg-neutral-50 border border-neutral-300 p-8 mb-6 relative">
      {error && (
        <div className="flex flex-col items-center py-8 space-y-4">
          <div className="text-neutral-800 text-center">{error}</div>
        </div>
      )}

      {imageInfo && imageUrl && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <ImagePreview imageUrl={imageUrl} fileName={imageInfo.fileName} />
            </div>

            <div>
              <ImageInfo imageInfo={imageInfo} />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(false)}
        className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 bg-neutral-50 border border-neutral-300 rounded-full p-2 hover:bg-neutral-100 transition-colors z-10"
        aria-label="Collapse panel"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neutral-600 transform rotate-180 transition-transform duration-200"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>
    </div>
  );
}
