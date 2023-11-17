'use client';
import { useAtom } from 'jotai';

import { targetForceAtom } from './store';

import InputNumber from 'antd/lib/input-number';

const TargetForceInput = () => {
  const [targetForce, setTargetForce] = useAtom(targetForceAtom);

  const handleChange = (value: number | null) => {
    setTargetForce(value ?? 0);
  };

  return (
    <InputNumber
      precision={0}
      min={0}
      step={10}
      value={targetForce}
      onChange={handleChange}
    />
  );
};

export default TargetForceInput;
