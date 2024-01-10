'use client';
import { useTranslations } from 'next-intl';

const CatalystAvatar = () => {
  const t = useTranslations();

  return (
    <img
      src="/symbol-catalyst.png"
      alt={t('symbol_catalyst')}
      style={{ width: 20 }}
    />
  );
};

export default CatalystAvatar;
