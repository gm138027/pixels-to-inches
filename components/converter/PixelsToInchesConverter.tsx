import React, { useState } from 'react';
import { ConversionMode } from '../../lib/conversion';
import ModeSelector from './ModeSelector';
import SimpleConverter from './SimpleConverter';
import DimensionConverter from './DimensionConverter';
import ImageAnalyzer from './ImageAnalyzer';
import ImageUploadButton from './ImageUploadButton';
import { useTranslations } from 'next-intl'; // 导入翻译函数

export default function PixelsToInchesConverter() {
    const [mode, setMode] = useState<ConversionMode>('screen');
    const [copied, setCopied] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const t = useTranslations(); // 获取翻译函数

    // 处理文件选择
    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
    };

    // 复制到剪贴板
    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            setTimeout(() => setCopied(''), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="w-full mx-auto bg-white max-w-4xl lg:max-w-2xl">
            {/* 模式选择器 */}
            <ModeSelector selectedMode={mode} onModeChange={setMode} />

            {/* 主转换区域 */}
            <div className="bg-neutral-50 border-x border-b border-neutral-300 p-8 mb-1">
                {mode === 'screen' ? (
                    <SimpleConverter onCopy={copyToClipboard} copied={copied} />
                ) : (
                    <DimensionConverter onCopy={copyToClipboard} copied={copied} />
                )}

                {/* 图片上传提示 */}
                <div className="mt-6 text-center">
                    <div className="text-neutral-600 mb-2">
                        {t('converter.uploadHint')}{' '}
                        <ImageUploadButton onFileSelect={handleFileSelect} />
                        {' '}{t('converter.uploadHintEnd')}
                    </div>
                </div>
            </div>

            {/* 独立的图片分析区域 */}
            {selectedFile && (
                <ImageAnalyzer selectedFile={selectedFile} />
            )}
        </div>
    );
}