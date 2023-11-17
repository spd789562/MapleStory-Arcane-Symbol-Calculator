'use client';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { calcForceTypeAtom } from './store';

import Select from 'antd/lib/select';

import { evolve } from 'ramda';

import { SymbolType } from '@/mapping/region';

const Options = [
  {
    label: 'arcane_river' as keyof IntlMessages,
    value: SymbolType.Arcane,
  },
  {
    label: 'grandis' as keyof IntlMessages,
    value: SymbolType.Grandis,
  },
];

const ForceTypeSelect = () => {
  const t = useTranslations();
  const [forceType, setForceType] = useAtom(calcForceTypeAtom);

  return (
    <Select
      value={forceType}
      onChange={setForceType}
      options={Options.map(evolve({ label: t }))}
    />
  );
};

export default ForceTypeSelect;
