'use client';
import { useAtomValue, useSetAtom } from 'jotai';

import {
  currentCustomCountAtom,
  currentCountSelector,
  isUsingCustomValueAtom,
  symbolTypeAtom,
  currentSymbolTypeAtom,
} from './store';

import SymbolInputRangeSync from '@/components/SymbolInputRangeSync';

const CurrentRangeSync = () => {
  const symbolType = useAtomValue(symbolTypeAtom);
  const regionType = useAtomValue(currentSymbolTypeAtom);
  const disabled = !useAtomValue(isUsingCustomValueAtom);

  const currentCount = useAtomValue(currentCountSelector);

  const setCurrentCount = useSetAtom(currentCustomCountAtom);

  const handleChange = (value: number | null) => {
    if (disabled) return;
    setCurrentCount(value ?? 0);
  };

  return (
    <SymbolInputRangeSync
      name={regionType}
      /* i should change this prop name */
      region={symbolType}
      value={currentCount}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default CurrentRangeSync;
