'use client';
import { memo } from 'react';

import InputNumber from 'antd/lib/input-number';

import SymbolLevelInfo, { type SymbolLevelData } from '@/mapping/symbol';
import SymbolInfo from '@/mapping/force';
import type { SymbolType } from '@/mapping/region';

interface LevelInputProps {
  /** total exp */
  value: number;
  /** current matching symbol level  */
  levelData: SymbolLevelData;
  region: SymbolType;
  onChange?: (value: number | null) => void;
  disabled?: boolean;
}
const LevelInput: React.FC<LevelInputProps> = ({ value, onChange, levelData, region, disabled }) => {
  const CurrentSymbolInfo = SymbolInfo[region];

  const maxLevel = CurrentSymbolInfo.symbol.maxLevel;

  const handleChange = (level: number | null) => {
    if (!onChange) return;
    if (level) {
      const CurrentSymbolLevelInfo = SymbolLevelInfo[region][level];
      onChange(value - levelData.stack + CurrentSymbolLevelInfo.stack);
    } else {
      onChange(0);
    }
  };

  return (
    <InputNumber
      precision={0}
      min={0}
      max={maxLevel}
      value={levelData.level}
      style={{ width: 60 }}
      onChange={handleChange}
      placeholder="Lv."
      defaultValue={0}
      disabled={disabled}
    />
  );
};

export default memo(LevelInput);
