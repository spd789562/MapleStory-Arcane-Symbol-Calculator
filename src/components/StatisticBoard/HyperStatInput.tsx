'use client';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { hyperStatAtom } from '@/store/settings';

import InputNumber from 'antd/lib/input-number';

import SymbolInfo from '@/mapping/force';
import { SymbolType } from '@/mapping/region';

interface HyperStatInputProps {
  region: SymbolType;
}
const HyperStatInput: React.FC<HyperStatInputProps> = ({ region }) => {
  const [hyperStat, setHyperStat] = useAtom(hyperStatAtom);
  const t = useTranslations();
  const CurrentSymbolInfo = SymbolInfo[region];

  if (!CurrentSymbolInfo.hyper) {
    return null;
  }

  const handleChange = (value: number | null) => {
    setHyperStat(value ?? 0);
  };

  return (
    <InputNumber
      value={hyperStat}
      onChange={handleChange}
      size="small"
      min={0}
      max={CurrentSymbolInfo.hyper.maxLevel}
      precision={0}
      placeholder={t('hyper_stat')}
    />
  );
};

export default HyperStatInput;
