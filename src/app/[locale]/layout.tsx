import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';

import { NextIntlClientProvider, createTranslator } from 'next-intl';
import StyledComponentsRegistry from './lib.client/AntdRegistry';
import JotaiProvider from './lib.client/JotaiProvider';
import ConfigProvider from 'antd/lib/config-provider';

import theme from '@/theme/antd';

const inter = Inter({ subsets: ['latin'] });

interface MetadataParams {
  params: { locale: string };
}
export async function generateMetadata({ params: { locale } }: MetadataParams): Promise<Metadata> {
  const _locale = locale || 'en';
  let messages = (await import(`@/i18n/${_locale || 'en'}/index.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: t('title'),
    description: t('seo_desc'),
    keywords: '秘法符文計算機,arc計算機,arc,秘法符文,Arcane Symbol Calculator,Arcane Symbol,Arcane SymbolPower',
    openGraph: {
      title: t('title'),
      siteName: t('title'),
      description: t('seo_desc'),
      type: 'website',
      locale: _locale,
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh_tw' }, { locale: 'zh_cn' }];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}
export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  const _locale = locale || 'en';
  let messages = {};
  try {
    messages = (await import(`@/i18n/${_locale || 'en'}/index.json`)).default;
  } catch (e) {
    notFound();
  }
  return (
    <html lang={_locale}>
      <body className={inter.className}>
        <JotaiProvider>
          <NextIntlClientProvider locale={_locale} messages={messages}>
            <ConfigProvider theme={theme}>
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </ConfigProvider>
          </NextIntlClientProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
