'use client';
import { useMemo } from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { symbolTypeAtom, currentSymbolTypeAtom } from './store';

import Select from 'antd/lib/select';

import {
  SymbolType,
  SymbolTypeMapping,
  ArcaneSymbolType,
  GrandisSymbolType,
} from '@/mapping/region';

const RegionSymbolTypeSelect = () => {
  const symbolType = useAtomValue(symbolTypeAtom);
  const [regionType, setRegionType] = useAtom(currentSymbolTypeAtom);
  const t = useTranslations();

  const options = useMemo(
    () =>
      SymbolTypeMapping[symbolType].map((region) => ({
        label: t(region),
        value: region,
      })),
    [t, symbolType],
  );

  const handleChange = (value: ArcaneSymbolType | GrandisSymbolType | null) => {
    if (value === null) {
      return;
    }
    setRegionType(value);
  };

  return (
    <Select
      value={regionType}
      onChange={handleChange}
      options={options}
      popupMatchSelectWidth
    />
  );
};

export default RegionSymbolTypeSelect;
