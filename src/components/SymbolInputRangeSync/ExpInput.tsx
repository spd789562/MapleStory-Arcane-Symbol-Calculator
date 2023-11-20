'use client';
import { memo, useCallback } from 'react';

import InputNumber from 'antd/lib/input-number';

import { type SymbolLevelData } from '@/mapping/symbol';

interface ExpInputProps {
  /** total exp */
  value: number;
  /** current matching symbol level  */
  levelData: SymbolLevelData;
  onChange?: (value: number | null) => void;
  disabled?: boolean;
}
const ExpInput: React.FC<ExpInputProps> = ({ value, onChange, levelData, disabled }) => {
  /* change totalExp to certain level's exp */
  const formatter = useCallback(
    (totalExp: number | undefined, info: any) => {
      return `${(totalExp || 0) - levelData.stack + Number(levelData.level === 1)}`;
    },
    [levelData],
  );
  /* change exp to onChange totalExp */
  const parser = useCallback((exp?: string) => Number(exp) + levelData.stack, [levelData]);

  return (
    <InputNumber
      precision={0}
      min={0}
      max={levelData.count + levelData.stack}
      formatter={formatter}
      parser={parser}
      value={value}
      style={{ width: 70 }}
      onChange={onChange}
      placeholder="Exp"
      defaultValue={0}
      disabled={disabled}
    />
  );
};

export default memo(ExpInput);
