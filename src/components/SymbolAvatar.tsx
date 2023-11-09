import Avatar from 'antd/lib/avatar/avatar';

import { useTranslations } from 'next-intl';

import type { SymbolType, ArcaneSymbolType, GrandisSymbolType } from '@/mapping/region';

interface SymbolAvatarProps {
  region: SymbolType;
  name: ArcaneSymbolType | GrandisSymbolType | 'default';
}
const SymbolAvatar: React.FC<SymbolAvatarProps> = ({ region, name }) => {
  const t = useTranslations();
  const isDefault = name === 'default';

  return (
    <Avatar
      src={`/${region}-symbol-${name}.png`}
      alt={t('alt_symbol', { name: isDefault ? 'default' : t(name) })}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default SymbolAvatar;
