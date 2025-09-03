/**
 * 国际化配置统一性测试
 */

import { getStaticPropsWithTranslations } from '../translations';

describe('国际化配置统一性测试', () => {
  test('getStaticPropsWithTranslations 应该返回正确的结构', async () => {
    const result = await getStaticPropsWithTranslations();
    
    expect(result).toHaveProperty('props');
    expect(result.props).toHaveProperty('messages');
    expect(result.props).toHaveProperty('locale');
    expect(result.props.locale).toBe('en');
  });

  test('getStaticPropsWithTranslations 应该包含必要的翻译键', async () => {
    const result = await getStaticPropsWithTranslations();
    
    expect(result.props.messages).toHaveProperty('common');
    expect(result.props.messages).toHaveProperty('converter');
    expect(result.props.messages).toHaveProperty('seo');
  });
}); 