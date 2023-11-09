'use client';
import { useTranslations } from 'next-intl';

import Avatar from 'antd/lib/avatar/avatar';

interface SymbolAvatarProps {
  name: keyof IntlMessages;
}
const SymbolAvatar: React.FC<SymbolAvatarProps> = ({ name }) => {
  const t = useTranslations();

  return (
    <Avatar shape="square" src="/daily.png" alt={t('alt_daily', { name: t(name) })} style={{ cursor: 'pointer' }} />
  );
};

export default SymbolAvatar;
