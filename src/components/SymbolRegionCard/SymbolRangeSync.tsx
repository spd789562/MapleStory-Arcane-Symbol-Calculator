'use client';
import { useCallback } from 'react';

import { useAtom } from 'jotai';
import { symbolAtomMap } from '@/store/symbols';

import SymbolInputRangeSync from '@/components/SymbolInputRangeSync';

import type { SymbolType, SymbolRegionType } from '@/mapping/region';

interface SymbolRangeSyncProps {
  name: SymbolRegionType;
  region: SymbolType;
}
const SymbolRangeSync: React.FC<SymbolRangeSyncProps> = ({ name, region }) => {
  const [value, setValue] = useAtom(symbolAtomMap[name].countAtom);

  const onChange = useCallback((value: number | null) => {
    setValue(value ?? 0);
  }, []);

  return <SymbolInputRangeSync name={name} region={region} value={value} onChange={onChange} />;
};

export default SymbolRangeSync;
