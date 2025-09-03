import React from 'react';
import Image from 'next/image'; // 导入Next.js优化的Image组件
import Link from 'next/link'; // 导入Next.js的Link组件
import { useTranslations } from '../../lib/translations';

export default function Footer() {
  const t = useTranslations('footer');
  const tHeader = useTranslations('header');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 网站信息 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo/favicon-32x32.png"
                alt={tHeader('logoAlt')}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="font-semibold text-neutral-900">Pixels to Inches</span>
            </div>
            <p className="text-sm text-neutral-600">
              {t('description')}
            </p>
          </div>

          {/* 快速链接 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-900">{t('quickLinks')}</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="/" className="hover:text-neutral-900 transition-colors">
                  {t('converterTool')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-neutral-900 transition-colors" rel="noopener">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-neutral-900 transition-colors" rel="noopener">
                  {t('termsOfService')}
                </Link>
              </li>
              </ul>
            </nav>
          </div>

          {/* 技术信息 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-900">{t('features')}</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>• {t('realTimeConversion')}</li>
              <li>• {t('imageDpiAnalysis')}</li>
              <li>• {t('screenPrintModes')}</li>
              <li>• {t('responsiveDesign')}</li>
            </ul>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="border-t border-neutral-200 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-neutral-700">
              {t('copyright', { year: currentYear })}
            </p>
            <p className="text-xs text-neutral-600">
              {t('madeWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}