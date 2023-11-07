'use client';
import { useTranslations } from 'next-intl';
// import { useAtom } from 'jotai';

import Select from 'antd/lib/select';

import { evolve } from 'ramda';

const dayOptions: { value: number; label: keyof IntlMessages }[] = [
  { value: 1, label: 'setting_day_1' },
  { value: 2, label: 'setting_day_2' },
  { value: 3, label: 'setting_day_3' },
  { value: 4, label: 'setting_day_4' },
  { value: 5, label: 'setting_day_5' },
  { value: 6, label: 'setting_day_6' },
  { value: 7, label: 'setting_day_7' },
];

const ResetDaySelect = () => {
  const t = useTranslations();
  const onChange = (value: number) => {};
  return <Select defaultValue={1} onChange={onChange} options={dayOptions.map(evolve({ label: t }))} />;
};

export default ResetDaySelect;
