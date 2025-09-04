import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // 导入Next.js优化的Image组件
import { useTranslations } from '../../lib/translations';
import LanguageSelector from '../common/LanguageSelector';

export default function Header() {
  const t = useTranslations('header');

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + 网站名 */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            aria-label={t('homeAriaLabel')}
          >
            <Image
              src="/logo/favicon-32x32.png"
              alt={t('logoAlt')}
              width={32}
              height={32}
              className="w-8 h-8"
              priority
              loading="eager"
            />
            <span className="text-xl font-semibold text-neutral-900">
              Pixels to Inches
            </span>
          </Link>

          {/* 导航菜单区域 - 为未来扩展预留 */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* 未来可以添加更多导航链接 */}
          </nav>

          {/* 右侧工具栏 */}
          <div className="flex items-center space-x-4">
            {/* 语言切换器 */}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}