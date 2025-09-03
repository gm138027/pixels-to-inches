import Layout from '../components/layout/Layout'
import PixelsToInchesConverter from '../components/converter/PixelsToInchesConverter'
import SeoContent from '../components/seo/SeoContent'
import { useTranslations, getStaticPropsWithTranslations } from '../lib/translations'

export default function Home() {
  const t = useTranslations('seo');

  return (
    <Layout
      title={t('pageTitle')}
      description={t('pageDescription')}
    >
      {/* H1标题区域 */}
      <div className="text-center py-12 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
            {t('h1')}
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-light text-center">
            {t('h1Description')}
          </p>
        </div>
      </div>

      {/* 主要转换工具 */}
      <div className="container mx-auto px-4 py-4">
        <PixelsToInchesConverter />
      </div>

      {/* SEO内容区域 */}
      <div className="bg-white">
        <SeoContent />
      </div>
    </Layout>
  )
}

// 获取静态属性 - 传递翻译数据
export async function getStaticProps({ locale }: { locale?: string }) {
  return getStaticPropsWithTranslations(locale);
}