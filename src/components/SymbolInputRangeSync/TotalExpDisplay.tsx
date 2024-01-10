'use client';
import { memo } from 'react';

import SymbolForceInfo from '@/mapping/force';
import type { SymbolType } from '@/mapping/region';

interface TotalExpDisplayProps {
  value: number;
  region: SymbolType;
}
const TotalExpDisplay: React.FC<TotalExpDisplayProps> = ({ value, region }) => {
  const maxExp = SymbolForceInfo[region].symbol.maxExp;

  return (
    <span className="pl-1 text-xs text-stone-300">
      ( {value} / {maxExp} )
    </span>
  );
};

export default memo(TotalExpDisplay);
