'use client';
import { useAtom } from 'jotai';

import { isUsingCustomValueAtom } from './store';

import Switch from 'antd/lib/switch';

const CustomSwitch = () => {
  const [isUsingCustomValue, setIsUsingCustomValue] = useAtom(
    isUsingCustomValueAtom,
  );

  const handleChange = (value: boolean) => {
    setIsUsingCustomValue(value);
  };

  return <Switch checked={isUsingCustomValue} onChange={handleChange} />;
};

export default CustomSwitch;
