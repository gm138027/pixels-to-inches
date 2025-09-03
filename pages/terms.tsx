import React from 'react';
import Layout from '../components/layout/Layout';
import { useTranslations, getStaticPropsWithTranslations } from '../lib/translations';
import Breadcrumb, { BreadcrumbContainer } from '../components/common/Breadcrumb';

export default function Terms() {
  const t = useTranslations('terms');

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
                  {t('acceptance.title')}
                </h2>
                <p className="text-neutral-700 mb-4">
                  {t('acceptance.content')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  {t('useOfService.title')}
                </h2>
                <p className="text-neutral-700 mb-4">
                  {t('useOfService.content')}
                </p>
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