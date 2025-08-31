import * as React from 'react';
import { useTranslations } from 'next-intl';
import FaqSection from './FaqSection'; // 导入FAQ专用组件

export default function SeoContent() {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      {/* 介绍部分 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          {t('seo.intro.title')}
        </h2>
        <p className="text-lg text-neutral-700 leading-relaxed">
          {t('seo.intro.content')}
        </p>
      </section>

      {/* 如何转换 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          {t('seo.howTo.title')}
        </h2>
        <p className="text-lg text-neutral-700 mb-4">
          {t('seo.howTo.content')}
        </p>
        <ol className="list-decimal list-inside space-y-3 text-neutral-700 ml-4">
          <li className="text-base leading-relaxed">
            {t('seo.howTo.steps.0')}
          </li>
          <li className="text-base leading-relaxed">
            {t('seo.howTo.steps.1')}
          </li>
          <li className="text-base leading-relaxed">
            {t('seo.howTo.steps.2')}
          </li>
          <li className="text-base leading-relaxed">
            {t('seo.howTo.steps.3')}
          </li>
          <li className="text-base leading-relaxed">
            {t('seo.howTo.steps.4')}
          </li>
        </ol>
        <div className="bg-neutral-50 border-l-4 border-neutral-800 p-4 mt-6">
          <p className="text-neutral-800 font-semibold">{t('seo.howTo.formula')}</p>
        </div>
      </section>

      {/* 其他转换方法 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          {t('seo.otherWays.title')}
        </h2>
        <p className="text-lg text-neutral-700 mb-6">
          {t('seo.otherWays.intro')}
        </p>
        
        {/* 方法列表 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="font-semibold text-neutral-900 mb-2">
              {t('seo.otherWays.methods.0')}
            </h3>
            <p className="text-neutral-600 text-sm">
              {t('seo.otherWays.methodDetails.manual')}
            </p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="font-semibold text-neutral-900 mb-2">
              {t('seo.otherWays.methods.1')}
            </h3>
            <p className="text-neutral-600 text-sm">
              {t('seo.otherWays.methodDetails.online')}
            </p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="font-semibold text-neutral-900 mb-2">
              {t('seo.otherWays.methods.2')}
            </h3>
            <p className="text-neutral-600 text-sm">
              {t('seo.otherWays.methodDetails.software')}
            </p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="font-semibold text-neutral-900 mb-2">
              {t('seo.otherWays.methods.3')}
            </h3>
            <p className="text-neutral-600 text-sm">
              {t('seo.otherWays.methodDetails.spreadsheet')}
            </p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="font-semibold text-neutral-900 mb-2">
              {t('seo.otherWays.methods.4')}
            </h3>
            <p className="text-neutral-600 text-sm">
              {t('seo.otherWays.methodDetails.mobile')}
            </p>
          </div>
        </div>

        {/* 实际例子 */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-neutral-900">
            {t('seo.otherWays.examples.title')}
          </h3>
          
          {/* 例子1 */}
          <div className="bg-white border border-neutral-200 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('seo.otherWays.examples.example1.title')}
            </h4>
            <ul className="space-y-2 text-neutral-700">
              <li>• {t('seo.otherWays.examples.example1.screen96')}</li>
              <li>• {t('seo.otherWays.examples.example1.screen192')}</li>
              <li>• {t('seo.otherWays.examples.example1.print300')}</li>
            </ul>
          </div>

          {/* 例子2 */}
          <div className="bg-white border border-neutral-200 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-neutral-900 mb-4">
              {t('seo.otherWays.examples.example2.title')}
            </h4>
            <div className="space-y-3 text-neutral-700">
              <div>
                <p className="font-medium text-neutral-900 mb-1">{t('seo.otherWays.examples.example2.screen96Title')}</p>
                <p>{t('seo.otherWays.examples.example2.screen96')}</p>
              </div>
              <div>
                <p className="font-medium text-neutral-900 mb-1">{t('seo.otherWays.examples.example2.screen144Title')}</p>
                <p>{t('seo.otherWays.examples.example2.screen144')}</p>
              </div>
              <div>
                <p className="font-medium text-neutral-900 mb-1">{t('seo.otherWays.examples.example2.print300Title')}</p>
                <p>{t('seo.otherWays.examples.example2.print300')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特点 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          {t('seo.features.title')}
        </h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">✓</span>
            <span className="text-neutral-700">{t('seo.features.list.0')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">✓</span>
            <span className="text-neutral-700">{t('seo.features.list.1')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">✓</span>
            <span className="text-neutral-700">{t('seo.features.list.2')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">✓</span>
            <span className="text-neutral-700">{t('seo.features.list.3')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">✓</span>
            <span className="text-neutral-700">{t('seo.features.list.4')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">✓</span>
            <span className="text-neutral-700">{t('seo.features.list.5')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">✓</span>
            <span className="text-neutral-700">{t('seo.features.list.6')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">✓</span>
            <span className="text-neutral-700">{t('seo.features.list.7')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">✓</span>
            <span className="text-neutral-700">{t('seo.features.list.8')}</span>
          </li>
        </ul>
      </section>

      {/* 常见用途 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          {t('seo.commonUses.title')}
        </h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">•</span>
            <span className="text-neutral-700">{t('seo.commonUses.list.0')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">•</span>
            <span className="text-neutral-700">{t('seo.commonUses.list.1')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">•</span>
            <span className="text-neutral-700">{t('seo.commonUses.list.2')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">•</span>
            <span className="text-neutral-700">{t('seo.commonUses.list.3')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">•</span>
            <span className="text-neutral-700">{t('seo.commonUses.list.4')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">•</span>
            <span className="text-neutral-700">{t('seo.commonUses.list.5')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">•</span>
            <span className="text-neutral-700">{t('seo.commonUses.list.6')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">•</span>
            <span className="text-neutral-700">{t('seo.commonUses.list.7')}</span>
          </li>
        </ul>
      </section>

      {/* 为什么选择我们 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          {t('seo.whyChoose.title')}
        </h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">★</span>
            <span className="text-neutral-700">{t('seo.whyChoose.list.0')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">★</span>
            <span className="text-neutral-700">{t('seo.whyChoose.list.1')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">★</span>
            <span className="text-neutral-700">{t('seo.whyChoose.list.2')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">★</span>
            <span className="text-neutral-700">{t('seo.whyChoose.list.3')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">★</span>
            <span className="text-neutral-700">{t('seo.whyChoose.list.4')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">★</span>
            <span className="text-neutral-700">{t('seo.whyChoose.list.5')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">★</span>
            <span className="text-neutral-700">{t('seo.whyChoose.list.6')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">★</span>
            <span className="text-neutral-700">{t('seo.whyChoose.list.7')}</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-neutral-800 font-bold text-lg">★</span>
            <span className="text-neutral-700">{t('seo.whyChoose.list.8')}</span>
          </li>
        </ul>
      </section>

      {/* DPI和PPI解释 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          {t('seo.dpiPpi.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* PPI部分 */}
          <div className="bg-neutral-100 p-6 rounded-lg border border-neutral-300">
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
              {t('seo.dpiPpi.ppi.title')}
            </h3>
            <p className="text-neutral-700 mb-4">
              {t('seo.dpiPpi.ppi.description')}
            </p>
            <ul className="space-y-2">
              <li className="text-neutral-600">
                • {t('seo.dpiPpi.ppi.values.0')}
              </li>
              <li className="text-neutral-600">
                • {t('seo.dpiPpi.ppi.values.1')}
              </li>
              <li className="text-neutral-600">
                • {t('seo.dpiPpi.ppi.values.2')}
              </li>
              <li className="text-neutral-600">
                • {t('seo.dpiPpi.ppi.values.3')}
              </li>
            </ul>
          </div>

          {/* DPI部分 */}
          <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-300">
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
              {t('seo.dpiPpi.dpi.title')}
            </h3>
            <p className="text-neutral-700 mb-4">
              {t('seo.dpiPpi.dpi.description')}
            </p>
            <ul className="space-y-2">
              <li className="text-neutral-600">
                • {t('seo.dpiPpi.dpi.values.0')}
              </li>
              <li className="text-neutral-600">
                • {t('seo.dpiPpi.dpi.values.1')}
              </li>
              <li className="text-neutral-600">
                • {t('seo.dpiPpi.dpi.values.2')}
              </li>
              <li className="text-neutral-600">
                • {t('seo.dpiPpi.dpi.values.3')}
              </li>
            </ul>
          </div>
        </div>
        
        <p className="text-lg text-neutral-700 mt-6">
          {t('seo.dpiPpi.conclusion')}
        </p>
      </section>

      {/* 常见转换例子 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          {t('seo.commonExamples.title')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* 屏幕转换 */}
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              {t('seo.commonExamples.screen.title')}
            </h3>
            <ul className="space-y-2">
              <li className="text-neutral-700">
                {t('seo.commonExamples.screen.examples.0')}
              </li>
              <li className="text-neutral-700">
                {t('seo.commonExamples.screen.examples.1')}
              </li>
              <li className="text-neutral-700">
                {t('seo.commonExamples.screen.examples.2')}
              </li>
              <li className="text-neutral-700">
                {t('seo.commonExamples.screen.examples.3')}
              </li>
            </ul>
          </div>

          {/* 打印转换 */}
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              {t('seo.commonExamples.print.title')}
            </h3>
            <ul className="space-y-2">
              <li className="text-neutral-700">
                {t('seo.commonExamples.print.examples.0')}
              </li>
              <li className="text-neutral-700">
                {t('seo.commonExamples.print.examples.1')}
              </li>
              <li className="text-neutral-700">
                {t('seo.commonExamples.print.examples.2')}
              </li>
              <li className="text-neutral-700">
                {t('seo.commonExamples.print.examples.3')}
              </li>
            </ul>
          </div>

          {/* 移动设备例子 */}
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              {t('seo.commonExamples.mobile.title')}
            </h3>
            <ul className="space-y-2">
              <li className="text-neutral-700">
                {t('seo.commonExamples.mobile.examples.0')}
              </li>
              <li className="text-neutral-700">
                {t('seo.commonExamples.mobile.examples.1')}
              </li>
              <li className="text-neutral-700">
                {t('seo.commonExamples.mobile.examples.2')}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ部分 - 使用专用组件 */}
      <FaqSection />
    </div>
  );
}