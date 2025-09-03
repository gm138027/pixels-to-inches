import React from 'react';
import Layout from '../components/layout/Layout';
import { useTranslations, getStaticPropsWithTranslations } from '../lib/translations';
import Breadcrumb, { BreadcrumbContainer } from '../components/common/Breadcrumb';

export default function Privacy() {
  const t = useTranslations('privacy');

  return (
    <Layout
      title={t('pageTitle')}
      description={t('pageDescription')}
    >
      {/* 面包屑导航 */}
      <BreadcrumbContainer>
        <Breadcrumb />
      </BreadcrumbContainer>

      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
              {t('pageTitle')}
            </h1>

            <div className="prose prose-neutral max-w-none">
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
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  {t('informationCollection.personal.title')}
                </h3>
                <p className="text-neutral-700 mb-4">
                  {t('informationCollection.personal.content')}
                </p>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  {t('informationCollection.usage.title')}
                </h3>
                <p className="text-neutral-700 mb-4">
                  {t('informationCollection.usage.content')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  {t('useOfInformation.title')}
                </h2>
                <p className="text-neutral-700 mb-4">
                  {t('useOfInformation.content')}
                </p>
                <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                  <li>{t('useOfInformation.purposes.0')}</li>
                  <li>{t('useOfInformation.purposes.1')}</li>
                  <li>{t('useOfInformation.purposes.2')}</li>
                  <li>{t('useOfInformation.purposes.3')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  {t('informationSharing.title')}
                </h2>
                <p className="text-neutral-700 mb-4">
                  {t('informationSharing.content')}
                </p>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  {t('informationSharing.thirdParty.title')}
                </h3>
                <p className="text-neutral-700 mb-4">
                  {t('informationSharing.thirdParty.content')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  {t('dataSecurity.title')}
                </h2>
                <p className="text-neutral-700 mb-4">
                  {t('dataSecurity.content')}
                </p>
                <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                  <li>{t('dataSecurity.measures.0')}</li>
                  <li>{t('dataSecurity.measures.1')}</li>
                  <li>{t('dataSecurity.measures.2')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  {t('cookies.title')}
                </h2>
                <p className="text-neutral-700 mb-4">
                  {t('cookies.content')}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">
                      {t('cookies.types.essential.title')}
                    </h3>
                    <p className="text-neutral-700 mb-4">
                      {t('cookies.types.essential.content')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">
                      {t('cookies.types.analytics.title')}
                    </h3>
                    <p className="text-neutral-700 mb-4">
                      {t('cookies.types.analytics.content')}
                    </p>
                  </div>
                </div>
                <p className="text-neutral-700 mb-4">
                  {t('cookies.management')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  {t('informationSharing.title')}
                </h2>
                <p className="text-neutral-700 mb-4">
                  {t('informationSharing.content')}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">
                      {t('informationSharing.thirdParty.title')}
                    </h3>
                    <p className="text-neutral-700">
                      {t('informationSharing.thirdParty.content')}
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
              </section>

              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  {t('internationalTransfers.title')}
                </h2>
                <p className="text-neutral-700 mb-4">
                  {t('internationalTransfers.content')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  {t('dataSecurity.title')}
                </h2>
                <p className="text-neutral-700 mb-4">
                  {t('dataSecurity.content')}
                </p>
                <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                  <li>{t('dataSecurity.measures.0')}</li>
                  <li>{t('dataSecurity.measures.1')}</li>
                  <li>{t('dataSecurity.measures.2')}</li>
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
                  <li>{t('userRights.rights.0')}</li>
                  <li>{t('userRights.rights.1')}</li>
                  <li>{t('userRights.rights.2')}</li>
                  <li>{t('userRights.rights.3')}</li>
                  <li>{t('userRights.rights.4')}</li>
                  <li>{t('userRights.rights.5')}</li>
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
                <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                  <li>{t('contact.methods.0')}</li>
                  <li>{t('contact.methods.1')}</li>
                </ul>
              </section>

              <div className="border-t border-neutral-200 pt-6 mt-6">
                <p className="text-neutral-600 text-sm">
                  {t('lastUpdated')} September 3, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// 获取静态属性 - 传递翻译数据
export async function getStaticProps({ locale }: { locale?: string }) {
  return getStaticPropsWithTranslations(locale);
}