'use client';
import { useSetAtom, useAtomValue } from 'jotai';

import {
  isCustomForceAtom,
  currentForceSelector,
  customForceAtom,
} from './store';

import InputNumber from 'antd/lib/input-number';

const CustomForceInput = () => {
  const disabled = !useAtomValue(isCustomForceAtom);
  const currentForce = useAtomValue(currentForceSelector);
  const setCurrentForce = useSetAtom(customForceAtom);

  const handleChange = (value: number | null) => {
    setCurrentForce(value ?? 0);
  };

  return (
    <InputNumber
      precision={0}
      min={0}
      step={10}
      value={currentForce}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default CustomForceInput;
