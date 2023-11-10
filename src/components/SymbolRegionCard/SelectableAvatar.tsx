'use client';
import { useTranslations } from 'next-intl';

import Avatar from 'antd/lib/avatar/avatar';

import { SymbolType } from '@/mapping/region';

interface SelectableAvatarProps {
  region: SymbolType;
}
const SelectableAvatar: React.FC<SelectableAvatarProps> = ({ region }) => {
  const t = useTranslations();

  return (
    <Avatar
      src={`/${region === SymbolType.Arcane ? 'arc' : 'aut'}-selectable.png`}
      alt={t('alt_extra')}
      className="cursor-pointer"
    />
  );
};

export default SelectableAvatar;
