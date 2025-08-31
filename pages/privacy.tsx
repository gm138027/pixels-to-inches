import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('privacy');
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
            <span className="text-neutral-900 font-medium">{nav('privacyPolicy')}</span>
          </div>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
          {t('title')}
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('introduction.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('introduction.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('informationCollection.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('informationCollection.content')}
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
              <li>{t('informationCollection.items.0')}</li>
              <li>{t('informationCollection.items.1')}</li>
              <li>{t('informationCollection.items.2')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('informationUsage.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('informationUsage.content')}
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4 mb-4">
              <li>{t('informationUsage.items.0')}</li>
              <li>{t('informationUsage.items.1')}</li>
              <li>{t('informationUsage.items.2')}</li>
              <li>{t('informationUsage.items.3')}</li>
              <li>{t('informationUsage.items.4')}</li>
              <li>{t('informationUsage.items.5')}</li>
            </ul>
            <div className="bg-neutral-50 border-l-4 border-neutral-800 p-4">
              <p className="text-neutral-700 text-sm">
                <strong>Important Note:</strong> {t('informationUsage.note')}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('informationProtection.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('informationProtection.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('cookies.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('cookies.content')}
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4 mb-4">
              <li>{t('cookies.types.0')}</li>
              <li>{t('cookies.types.1')}</li>
              <li>{t('cookies.types.2')}</li>
            </ul>
            <p className="text-neutral-700 mb-4">
              {t('cookies.control')}
            </p>
            <div className="bg-neutral-50 border-l-4 border-neutral-400 p-4">
              <p className="text-neutral-700 text-sm">
                <strong>Web Vitals:</strong> {t('cookies.webVitals')}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('thirdParty.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('thirdParty.content')}
            </p>
            
            <div className="space-y-4 ml-4">
              <div>
                <h3 className="text-lg font-medium text-neutral-800 mb-2">
                  {t('thirdParty.services.analytics.title')}
                </h3>
                <p className="text-neutral-700">
                  {t('thirdParty.services.analytics.content')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-800 mb-2">
                  {t('thirdParty.services.performance.title')}
                </h3>
                <p className="text-neutral-700">
                  {t('thirdParty.services.performance.content')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-800 mb-2">
                  {t('thirdParty.services.general.title')}
                </h3>
                <p className="text-neutral-700">
                  {t('thirdParty.services.general.content')}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('dataRetention.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('dataRetention.content')}
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-3 ml-4">
              <li>{t('dataRetention.policies.0')}</li>
              <li>{t('dataRetention.policies.1')}</li>
              <li>{t('dataRetention.policies.2')}</li>
              <li>{t('dataRetention.policies.3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('userRights.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('userRights.content')}
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
              <li>{t('userRights.items.0')}</li>
              <li>{t('userRights.items.1')}</li>
              <li>{t('userRights.items.2')}</li>
              <li>{t('userRights.items.3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('childrenPrivacy.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('childrenPrivacy.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('policyChanges.title')}
            </h2>
            <p className="text-neutral-700 mb-4">
              {t('policyChanges.content')}
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