import Avatar from 'antd/lib/avatar/avatar';

import { useTranslations } from 'next-intl';

import type { SymbolType, SymbolRegionType } from '@/mapping/region';

interface SymbolAvatarProps {
  region: SymbolType;
  name: SymbolRegionType | 'default';
}
const SymbolAvatar: React.FC<SymbolAvatarProps> = ({ region, name }) => {
  const t = useTranslations();
  const isDefault = name === 'default';

  return (
    <Avatar
      src={`/${region}-symbol-${name}.png`}
      alt={t('alt_symbol', { name: isDefault ? 'default' : t(name) })}
      className='cursor-pointer'
    />
  );
};

export default SymbolAvatar;
