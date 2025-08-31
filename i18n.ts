import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // Provide a static locale, other strategies are also possible
  const locale = 'en';
 
  return {
    locale,
    messages: (await import(`./public/locales/${locale}.json`)).default
  };
});