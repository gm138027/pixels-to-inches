import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // Provide a static locale, other strategies are also possible
  const locale = 'en';
  
  // 服务端加载并合并所有翻译文件
  const [main, privacy, terms] = await Promise.all([
    import(`./public/locales/${locale}.json`),
    import(`./public/locales/privacy-${locale}.json`),
    import(`./public/locales/terms-${locale}.json`)
  ]);
  
  // 合并翻译对象
  const messages = {
    ...main.default,
    privacy: privacy.default,
    terms: terms.default
  };
 
  return {
    locale,
    messages: messages as any // 临时类型修复，避免 AbstractIntlMessages 类型冲突
  };
});