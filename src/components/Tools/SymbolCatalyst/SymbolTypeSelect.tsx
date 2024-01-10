'use client';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { symbolTypeAtom } from './store';

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

const SymbolTypeSelect = () => {
  const t = useTranslations();
  const [symbolType, setSymbolType] = useAtom(symbolTypeAtom);

  return (
    <Select
      value={symbolType}
      onChange={setSymbolType}
      options={Options.map(evolve({ label: t }))}
    />
  );
};

export default SymbolTypeSelect;
