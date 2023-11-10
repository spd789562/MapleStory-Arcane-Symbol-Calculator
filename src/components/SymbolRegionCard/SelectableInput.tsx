'use client';
import { useAtom } from 'jotai';

import { symbolAtomMap } from '@/store/symbols';

import InputNumber from 'antd/lib/input-number';

import type { ArcaneSymbolType, GrandisSymbolType } from '@/mapping/region';

interface SelectableInputProps {
  name: ArcaneSymbolType | GrandisSymbolType;
}
const SelectableInput: React.FC<SelectableInputProps> = ({ name }) => {
  const [value, setValue] = useAtom(symbolAtomMap[name].extraAtom);

  const handleChange = (value: number | null) => {
    setValue(value ?? 0);
  };

  return <InputNumber min={0} value={value} onChange={handleChange} precision={0} />;
};

export default SelectableInput;
