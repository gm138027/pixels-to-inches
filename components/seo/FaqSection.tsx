import React from 'react';
import { useTranslations } from 'next-intl';

/**
 * FAQ章节组件 - 专门处理常见问题部分
 * 这是SEO优化的重要组件，使用静态HTML结构确保搜索引擎友好
 */
export default function FaqSection() {
  const t = useTranslations(); // 获取翻译函数

  return (
    <>
      {/* FAQ部分 - 静态结构，SEO友好 */}
      <section className="space-y-6">
      <h2 className="text-3xl font-bold text-neutral-900 mb-4">
        {t('seo.faq.title')}
      </h2>
      <div className="space-y-6">
        {/* 问题1: What is a pixel? */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">
            {t('seo.faq.questions.0.question')}
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            {t('seo.faq.questions.0.answer')}
          </p>
        </div>

        {/* 问题2: How to convert pixels to inches? */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">
            {t('seo.faq.questions.1.question')}
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            {t('seo.faq.questions.1.answer')}
          </p>
        </div>

        {/* 问题3: How many pixels is 1 inch? */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">
            {t('seo.faq.questions.2.question')}
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            {t('seo.faq.questions.2.answer')}
          </p>
        </div>

        {/* 问题4: How many inches are in a pixel? */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">
            {t('seo.faq.questions.3.question')}
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            {t('seo.faq.questions.3.answer')}
          </p>
        </div>

        {/* 问题5: Is 300 pixels an inch? */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">
            {t('seo.faq.questions.4.question')}
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            {t('seo.faq.questions.4.answer')}
          </p>
        </div>

        {/* 问题6: Can I convert pixels to inches on my phone? */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">
            {t('seo.faq.questions.5.question')}
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            {t('seo.faq.questions.5.answer')}
          </p>
        </div>

        {/* 问题7: What image formats can Pixels to Inches Converter use? */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">
            {t('seo.faq.questions.6.question')}
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            {t('seo.faq.questions.6.answer')}
          </p>
        </div>

        {/* 问题8: Do you store the images I upload? */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">
            {t('seo.faq.questions.7.question')}
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            {t('seo.faq.questions.7.answer')}
          </p>
        </div>

        {/* 问题9: Can I convert pixels to inches infinitely? */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">
            {t('seo.faq.questions.8.question')}
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            {t('seo.faq.questions.8.answer')}
          </p>
        </div>
      </div>
      </section>
    </>
  );
}