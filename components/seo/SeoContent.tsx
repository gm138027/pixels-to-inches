import * as React from 'react';
import { useTranslations } from '../../lib/translations';
import FaqSection from './FaqSection'; // 导入FAQ专用组件

export default function SeoContent() {
  const t = useTranslations('seo');

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      {/* 介绍部分 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
          {t('intro.title')}
        </h2>
        <p className="text-lg text-neutral-700 leading-relaxed">
          {t('intro.content')}
        </p>
      </section>

      {/* 如何转换 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
          {t('howTo.title')}
        </h2>
        <p className="text-lg text-neutral-700 mb-4 leading-relaxed">
          {t('howTo.content')}
        </p>
        <ol className="list-decimal list-inside space-y-4 text-neutral-700 ml-4">
          <li className="text-base leading-relaxed">
            {t('howTo.steps.0')}
          </li>
          <li className="text-base leading-relaxed">
            {t('howTo.steps.1')}
          </li>
          <li className="text-base leading-relaxed">
            {t('howTo.steps.2')}
          </li>
          <li className="text-base leading-relaxed">
            {t('howTo.steps.3')}
          </li>
          <li className="text-base leading-relaxed">
            {t('howTo.steps.4')}
          </li>
        </ol>
        <div className="bg-neutral-900 rounded-lg p-6 mt-6 border-l-4 border-neutral-700">
          <p className="text-white font-bold text-xl tracking-wide">{t('howTo.formula')}</p>
        </div>
      </section>

      {/* 其他转换方法 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
          {t('otherWays.title')}
        </h2>
        <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
          {t('otherWays.intro')}
        </p>

        {/* 方法列表 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-neutral-200 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-3">
              {t('otherWays.methods.0')}
            </h3>
            <p className="text-neutral-600 text-base leading-relaxed">
              {t('otherWays.methodDetails.manual')}
            </p>
          </div>
          <div className="bg-white border border-neutral-200 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-3">
              {t('otherWays.methods.1')}
            </h3>
            <p className="text-neutral-600 text-base leading-relaxed">
              {t('otherWays.methodDetails.online')}
            </p>
          </div>
          <div className="bg-white border border-neutral-200 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-3">
              {t('otherWays.methods.2')}
            </h3>
            <p className="text-neutral-600 text-base leading-relaxed">
              {t('otherWays.methodDetails.software')}
            </p>
          </div>
          <div className="bg-white border border-neutral-200 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-3">
              {t('otherWays.methods.3')}
            </h3>
            <p className="text-neutral-600 text-base leading-relaxed">
              {t('otherWays.methodDetails.spreadsheet')}
            </p>
          </div>
          <div className="bg-white border border-neutral-200 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-3">
              {t('otherWays.methods.4')}
            </h3>
            <p className="text-neutral-600 text-base leading-relaxed">
              {t('otherWays.methodDetails.mobile')}
            </p>
          </div>
        </div>

        {/* 实际例子 */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-neutral-900 leading-tight">
            {t('otherWays.examples.title')}
          </h3>

          {/* 例子1 */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-10">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <h4 className="text-xl font-bold text-neutral-900">
                {t('otherWays.examples.example1.title')}
              </h4>
            </div>
            <ul className="space-y-4 text-neutral-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-base leading-relaxed">{t('otherWays.examples.example1.screen96')}</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-base leading-relaxed">{t('otherWays.examples.example1.screen192')}</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-base leading-relaxed">{t('otherWays.examples.example1.print300')}</span>
              </li>
            </ul>
          </div>

          {/* 例子2 */}
          <div className="bg-white border border-neutral-200 rounded-lg p-10">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <h4 className="text-xl font-bold text-neutral-900">
                {t('otherWays.examples.example2.title')}
              </h4>
            </div>
            <div className="space-y-6 text-neutral-700">
              <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-100">
                <p className="font-bold text-neutral-900 mb-3 text-lg">
                  {t('otherWays.examples.example2.screen96Title')}
                </p>
                <p className="text-base leading-relaxed">{t('otherWays.examples.example2.screen96')}</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-100">
                <p className="font-bold text-neutral-900 mb-3 text-lg">
                  {t('otherWays.examples.example2.screen144Title')}
                </p>
                <p className="text-base leading-relaxed">{t('otherWays.examples.example2.screen144')}</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-100">
                <p className="font-bold text-neutral-900 mb-3 text-lg">
                  {t('otherWays.examples.example2.print300Title')}
                </p>
                <p className="text-base leading-relaxed">{t('otherWays.examples.example2.print300')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特点 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
          {t('features.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed">{t('features.list.0')}</span>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed">{t('features.list.1')}</span>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed">{t('features.list.2')}</span>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed">{t('features.list.3')}</span>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed">{t('features.list.4')}</span>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed">{t('features.list.5')}</span>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed">{t('features.list.6')}</span>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed">{t('features.list.7')}</span>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed">{t('features.list.8')}</span>
          </div>
        </div>
      </section>

      {/* 常见用途 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
          {t('commonUses.title')}
        </h2>
        <ul className="grid md:grid-cols-2 gap-x-6 gap-y-3">
          <li className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('commonUses.list.0')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('commonUses.list.1')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('commonUses.list.2')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('commonUses.list.3')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('commonUses.list.4')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('commonUses.list.5')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('commonUses.list.6')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('commonUses.list.7')}}></span>
          </li>
        </ul>
      </section>

      {/* 为什么选择我们 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
          {t('whyChoose.title')}
        </h2>
        <ul className="grid md:grid-cols-2 gap-x-6 gap-y-3">
          <li className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('whyChoose.list.0')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('whyChoose.list.1')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('whyChoose.list.2')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('whyChoose.list.3')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('whyChoose.list.4')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('whyChoose.list.5')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('whyChoose.list.6')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('whyChoose.list.7')}}></span>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('whyChoose.list.8')}}></span>
          </li>
        </ul>
      </section>

      {/* DPI和PPI解释 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
          {t('dpiPpi.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* PPI部分 */}
          <div className="bg-neutral-50 p-10 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">
                {t('dpiPpi.ppi.title')}
              </h3>
            </div>
            <p className="text-neutral-700 mb-8 text-base leading-relaxed">
              {t('dpiPpi.ppi.description')}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('dpiPpi.ppi.values.0')}}></span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('dpiPpi.ppi.values.1')}}></span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('dpiPpi.ppi.values.2')}}></span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('dpiPpi.ppi.values.3')}}></span>
              </li>
            </ul>
          </div>

          {/* DPI部分 */}
          <div className="bg-white p-10 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">
                {t('dpiPpi.dpi.title')}
              </h3>
            </div>
            <p className="text-neutral-700 mb-8 text-base leading-relaxed">
              {t('dpiPpi.dpi.description')}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('dpiPpi.dpi.values.0')}}></span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('dpiPpi.dpi.values.1')}}></span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('dpiPpi.dpi.values.2')}}></span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-neutral-700 text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t('dpiPpi.dpi.values.3')}}></span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-lg text-neutral-700 mt-6 leading-relaxed">
          {t('dpiPpi.conclusion')}
        </p>
      </section>

      {/* 常见转换例子 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
          {t('commonExamples.title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 屏幕转换 */}
          <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900 mb-6 border-b border-neutral-200 pb-3">
              {t('commonExamples.screen.title')}
            </h3>
            <ul className="space-y-4">
              <li className="bg-white rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.screen.examples.0')}</span>
              </li>
              <li className="bg-white rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.screen.examples.1')}</span>
              </li>
              <li className="bg-white rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.screen.examples.2')}</span>
              </li>
              <li className="bg-white rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.screen.examples.3')}</span>
              </li>
            </ul>
          </div>

          {/* 打印转换 */}
          <div className="bg-white p-8 rounded-lg border border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900 mb-6 border-b border-neutral-200 pb-3">
              {t('commonExamples.print.title')}
            </h3>
            <ul className="space-y-4">
              <li className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.print.examples.0')}</span>
              </li>
              <li className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.print.examples.1')}</span>
              </li>
              <li className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.print.examples.2')}</span>
              </li>
              <li className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.print.examples.3')}</span>
              </li>
            </ul>
          </div>

          {/* 移动设备例子 */}
          <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900 mb-6 border-b border-neutral-200 pb-3">
              {t('commonExamples.mobile.title')}
            </h3>
            <ul className="space-y-4">
              <li className="bg-white rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.mobile.examples.0')}</span>
              </li>
              <li className="bg-white rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.mobile.examples.1')}</span>
              </li>
              <li className="bg-white rounded-lg p-4 border border-neutral-100">
                <span className="text-neutral-700 text-base leading-relaxed">{t('commonExamples.mobile.examples.2')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ部分 */}
      <FaqSection />
    </div>
  );
}
