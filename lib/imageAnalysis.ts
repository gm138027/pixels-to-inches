/**
 * 图片分析业务逻辑
 * 包含图片信息提取、DPI读取、物理尺寸计算等功能
 */

import { convertPixelsToInches } from './conversion';
import EXIF from 'exif-js'; // 专业的EXIF信息读取库

// 图片信息接口
export interface ImageInfo {
  width: number;          // 像素宽度
  height: number;         // 像素高度
  xResolution: number;    // X方向DPI
  yResolution: number;    // Y方向DPI
  physicalWidth: number;  // 物理宽度（英寸）
  physicalHeight: number; // 物理高度（英寸）
  fileSize: number;       // 文件大小（字节）
  fileName: string;       // 文件名
}

// 支持的图片格式
export const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'image/tiff',
  'image/bmp'
];

/**
 * 检查文件格式是否支持
 */
export function isSupportedFormat(file: File): boolean {
  return SUPPORTED_FORMATS.includes(file.type);
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * 从图片文件中提取EXIF信息
 */
export async function extractImageInfo(file: File): Promise<ImageInfo> {
  return new Promise((resolve, reject) => {
    // 检查文件格式
    if (!isSupportedFormat(file)) {
      reject(new Error(`Unsupported file format: ${file.type}`));
      return;
    }

    const img = new Image();
    
    img.onload = function() {
      try {
        // 默认值：基于文件类型的智能默认值
        let xResolution = 72;
        let yResolution = 72;
        
        // 根据文件类型设置默认DPI值
        if (file.type.includes('jpeg') || file.type.includes('jpg')) {
          xResolution = yResolution = 300; // JPEG通常用于打印，默认300 DPI
        } else if (file.type.includes('png')) {
          xResolution = yResolution = 96;  // PNG通常用于Web，默认96 DPI
        } else {
          xResolution = yResolution = 72;  // 其他格式使用72 DPI
        }
        
        // 统一的结果处理函数
        const resolveImageInfo = () => {
          const physicalWidth = convertPixelsToInches(img.width, xResolution);
          const physicalHeight = convertPixelsToInches(img.height, yResolution);

          const imageInfo: ImageInfo = {
            width: img.width,
            height: img.height,
            xResolution: Math.round(xResolution), // 四舍五入到整数
            yResolution: Math.round(yResolution),
            physicalWidth,
            physicalHeight,
            fileSize: file.size,
            fileName: file.name
          };

          resolve(imageInfo);
        };
        
        // 尝试使用EXIF库获取更准确的DPI信息（如果可用）
        try {
          // 使用类型断言避免TypeScript类型检查问题
          const exifLib = EXIF as unknown as {
            getData: (file: File, callback: () => void) => void;
            getTag: (file: File, tag: string) => number | undefined;
          };
          
          // 尝试从文件获取EXIF数据
          exifLib.getData(file, function() {
            const xRes = exifLib.getTag(file, 'XResolution');
            const yRes = exifLib.getTag(file, 'YResolution');
            const resolutionUnit = exifLib.getTag(file, 'ResolutionUnit');
            
            // 如果找到了有效的EXIF DPI信息
            if (xRes && yRes && xRes > 1 && yRes > 1) {
              xResolution = xRes;
              yResolution = yRes;
              
              // 处理分辨率单位（ResolutionUnit: 2=英寸, 3=厘米）
              if (resolutionUnit === 3) {
                // 如果是厘米，转换为英寸（1英寸 = 2.54厘米）
                xResolution = xResolution * 2.54;
                yResolution = yResolution * 2.54;
              }
              
              console.log(`Found EXIF DPI information: ${Math.round(xResolution)} x ${Math.round(yResolution)} DPI`);
            } else {
              console.warn(`No DPI information found in image EXIF data. Using default value: ${xResolution} DPI`);
            }
            
            // 计算并返回结果
            resolveImageInfo();
          });
          
          // 如果EXIF库在200ms内没有返回结果，使用默认值
          setTimeout(() => {
            resolveImageInfo();
          }, 200);
          
        } catch (exifError) {
          // 如果EXIF库出错，使用默认值
          console.warn('EXIF library error, using default DPI values:', exifError);
          resolveImageInfo();
        }
        
      } catch (error) {
        reject(new Error(`Image analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image. Please check if the file is corrupted.'));
    };

    // 使用FileReader读取文件
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file.'));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * 创建图片预览URL
 */
export function createImagePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * 清理图片预览URL
 */
export function revokeImagePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}