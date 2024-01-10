'use client';
import { useTranslations } from 'next-intl';
import Tooltip, { type TooltipPropsWithTitle } from 'antd/lib/tooltip';

interface I18nTooltipProps extends Omit<TooltipPropsWithTitle, 'title'> {
  id: keyof IntlMessages;
  title?: React.ReactNode;
}
export default function I18nTooltip({ id, title, ...rest }: I18nTooltipProps) {
  const t = useTranslations();

  return <Tooltip title={title || t(id)} {...rest} />;
}
