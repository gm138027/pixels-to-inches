import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { useTranslations } from 'next-intl';
import { GetStaticProps } from 'next';

export default function TermsOfService() {
  const t = useTranslations('terms');
  const nav = useTranslations('navigation');

  return (
    <Layout
      title={t('title')}
      description={t('description')}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 面包屑导航 */}
        <nav className="mb-6" aria-label={nav('breadcrumbAriaLabel')}>
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <Link 
              href="/" 
              className="hover:text-neutral-900 transition-colors flex items-center space-x-1"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              <span>{nav('home')}</span>
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-900 font-medium">{nav('termsOfService')}</span>
          </div>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
          {t('title')}
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('acceptance.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('acceptance.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('serviceDescription.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('serviceDescription.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('userResponsibilities.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('userResponsibilities.content')}
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
              <li>{t('userResponsibilities.items.0')}</li>
              <li>{t('userResponsibilities.items.1')}</li>
              <li>{t('userResponsibilities.items.2')}</li>
              <li>{t('userResponsibilities.items.3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('intellectualProperty.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('intellectualProperty.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('privacy.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('privacy.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('disclaimer.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('disclaimer.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('limitationOfLiability.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('limitationOfLiability.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('indemnification.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('indemnification.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('termination.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('termination.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('changes.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('changes.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('governingLaw.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('governingLaw.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('contact.content')}
            </p>
          </section>

          <div className="border-t border-neutral-200 pt-6 mt-6">
            <p className="text-neutral-600 text-sm">
              {t('lastUpdated')} {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const locale = 'en';
  
  // 服务端加载并合并所有翻译文件
  const [main, privacy, terms] = await Promise.all([
    import(`../public/locales/${locale}.json`),
    import(`../public/locales/privacy-${locale}.json`),
    import(`../public/locales/terms-${locale}.json`)
  ]);
  
  // 合并翻译对象
  const messages = {
    ...main.default,
    privacy: privacy.default,
    terms: terms.default
  };

  return {
    props: {
      messages,
      locale
    }
  };
};