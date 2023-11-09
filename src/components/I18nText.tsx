'use client';
import { useTranslations, TranslationValues } from 'next-intl';

interface I18nTextProps {
  id: keyof IntlMessages;
  className?: string;
  values?: TranslationValues;
}
export default function I18nText({ id, className = '', values }: I18nTextProps) {
  const t = useTranslations();

  return <span className={className}>{t(id, values)}</span>;
}
