import Layout from '../components/layout/Layout'
import PixelsToInchesConverter from '../components/converter/PixelsToInchesConverter'
import SeoContent from '../components/seo/SeoContent'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations();

  return (
    <Layout
      title={t('seo.h1')}
      description={t('seo.intro.content')}
    >
      {/* H1标题 - 只有标题，保持简洁 */}
      <div className="text-center py-8 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
            {t('seo.h1')}
          </h1>
        </div>
      </div>

      {/* 主要转换工具 */}
      <div className="container mx-auto px-4 py-8">
        <PixelsToInchesConverter />
      </div>

      {/* SEO内容区域 */}
      <div className="bg-white">
        <SeoContent />
      </div>
    </Layout>
  )
}