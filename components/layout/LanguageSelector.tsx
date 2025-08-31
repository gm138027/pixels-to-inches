import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function LanguageSelector() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  // 当前支持的语言列表（未来可扩展）
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' }
    // 未来可以添加更多语言：
    // { code: 'zh', name: '中文', flag: '🇨🇳' },
    // { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === 'en') || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors"
        aria-label={t('languageSelector.selectLanguage')}
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-neutral-700 hidden sm:block">
          {currentLanguage.name}
        </span>
        <svg 
          className={`w-4 h-4 text-neutral-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉菜单 - 目前只有英语，但为未来扩展做准备 */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-neutral-200 rounded-md shadow-lg py-1 z-50 min-w-[120px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                // 未来在这里实现语言切换逻辑
                console.log('Switch to language:', language.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-neutral-100 transition-colors ${
                currentLanguage.code === language.code ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium">{language.name}</span>
              {currentLanguage.code === language.code && (
                <svg className="w-4 h-4 text-neutral-800 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 点击外部关闭菜单 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}