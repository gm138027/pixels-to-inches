import React, { useState } from 'react';
import { ConversionMode } from '../../lib/conversion';
import ModeSelector from './ModeSelector';
import SimpleConverter from './SimpleConverter';
import DimensionConverter from './DimensionConverter';
import ImageAnalyzer from './ImageAnalyzer';
import ImageUploadButton from './ImageUploadButton';
import { useTranslations } from 'next-intl'; // 导入翻译函数
import { useAnalyticsContext } from '../analytics/AnalyticsProvider'; // 导入追踪上下文

export default function PixelsToInchesConverter() {
    const [mode, setMode] = useState<ConversionMode>('screen');
    const [copied, setCopied] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const t = useTranslations(); // 获取翻译函数
    const { trackEvent } = useAnalyticsContext(); // 获取追踪函数

    // 处理文件选择
    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        // 追踪图片上传
        trackEvent({
            event: 'image_upload',
            category: 'converter',
            action: 'upload_image',
            label: file.type,
            timestamp: Date.now()
        });
    };

    // 复制到剪贴板
    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            // 追踪复制操作
            trackEvent({
                event: 'copy_action',
                category: 'converter',
                action: 'copy_to_clipboard',
                label: type,
                timestamp: Date.now()
            });
            setTimeout(() => setCopied(''), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // 处理模式切换
    const handleModeChange = (newMode: ConversionMode) => {
        setMode(newMode);
        // 追踪功能切换
        trackEvent({
            event: 'mode_switch',
            category: 'converter',
            action: 'switch_mode',
            label: newMode,
            timestamp: Date.now()
        });
    };

    return (
        <div className="w-full mx-auto bg-white max-w-4xl lg:max-w-2xl">
            {/* 模式选择器 */}
            <ModeSelector selectedMode={mode} onModeChange={handleModeChange} />

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