'use client';
import { useAtomValue } from 'jotai';

import {
  symbolTypeAtom,
  currentSymbolTypeAtom,
  afterCountSelector,
} from './store';

import SymbolInputRangeSync from '@/components/SymbolInputRangeSync';

const AfterRangeSync = () => {
  const symbolType = useAtomValue(symbolTypeAtom);
  const regionType = useAtomValue(currentSymbolTypeAtom);

  const afterCount = useAtomValue(afterCountSelector);

  return (
    <SymbolInputRangeSync
      name={regionType}
      /* i should change this prop name */
      region={symbolType}
      value={afterCount}
      disabled
    />
  );
};

export default AfterRangeSync;
