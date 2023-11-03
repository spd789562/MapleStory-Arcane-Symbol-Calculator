'use client';
import { useTranslations } from 'next-intl';

interface I18nTextProps {
  id: keyof IntlMessages;
  className?: string;
}
export default function I18nText({ id, className = '' }: I18nTextProps) {
  const t = useTranslations();

  return <span className={className}>{t(id)}</span>;
}
