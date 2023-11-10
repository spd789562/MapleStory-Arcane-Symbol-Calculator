'use client';
import { useTranslations } from 'next-intl';
import { useAtom } from 'jotai';

import { symbolAtomMap } from '@/store/symbols';

import Button from 'antd/lib/button';

import type { ArcaneSymbolType, GrandisSymbolType } from '@/mapping/region';

interface SelectableApplyButtonProps {
  name: ArcaneSymbolType | GrandisSymbolType;
}
const SelectableApplyButton: React.FC<SelectableApplyButtonProps> = ({
  name,
}) => {
  const t = useTranslations();
  const [disabled, addExtraToCount] = useAtom(
    symbolAtomMap[name].addExtraToCount,
  );

  const handleClick = () => {
    addExtraToCount();
  };

  return (
    <Button block onClick={handleClick} disabled={disabled}>
      {t('extra_symbol_add')}
    </Button>
  );
};

export default SelectableApplyButton;
