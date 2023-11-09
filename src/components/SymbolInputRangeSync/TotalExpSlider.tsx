'use client';
import { memo, useCallback, useMemo } from 'react';

import Slider from 'antd/lib/slider';

import SymbolLevelInfo, { type SymbolLevelData } from '@/mapping/symbol';
import SymbolInfo from '@/mapping/force';
import type { SymbolType } from '@/mapping/region';

import symbolMatch from '@/util/symbol-match';
import { pipe, prop, indexBy, map } from 'ramda';

const makeMarks = pipe<SymbolLevelData[], Record<string, SymbolLevelData>, Record<string, string>>(
  (...data) => indexBy(prop('stack'), data),
  map<SymbolLevelData, string>(() => ' '),
);

interface TotalExpSliderProps {
  /** total exp */
  value: number;
  region: SymbolType;
  onChange?: (value: number | null) => void;
  disabled?: boolean;
}
const LevelInput: React.FC<TotalExpSliderProps> = ({ value, onChange, region, disabled }) => {
  const CurrentSymbolInfo = SymbolInfo[region];

  const toolTipFormatter = useCallback(
    (totalExp: number | undefined) => {
      const levelData = symbolMatch(region, totalExp || 0);
      return `Lv.${levelData.level} / ${(totalExp || 0) - levelData.stack}`;
    },
    [region],
  );

  const silderMarks = useMemo(() => makeMarks(...SymbolLevelInfo[region]), [region]);

  return (
    <Slider
      max={CurrentSymbolInfo.symbol.maxExp}
      value={value}
      tooltip={{ formatter: toolTipFormatter }}
      onChange={onChange}
      marks={silderMarks}
      disabled={disabled}
    />
  );
};

export default memo(LevelInput);
