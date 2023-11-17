'use client';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { forceEffectTypeAtom, ForceEffectType } from './store';

import Group from 'antd/lib/radio/group';

import { evolve } from 'ramda';
import type { RadioChangeEvent } from 'antd/lib';

const Options = [
  {
    label: 'use_force' as keyof IntlMessages,
    value: ForceEffectType.Force,
  },
  {
    label: 'option_custom' as keyof IntlMessages,
    value: ForceEffectType.Custom,
  },
];

const ForceEffectTypeRadio = () => {
  const t = useTranslations();
  const [forceEffectType, setForceEffectType] = useAtom(forceEffectTypeAtom);

  const handleChange = (e: RadioChangeEvent) => {
    setForceEffectType(e.target.value as ForceEffectType);
  };

  return (
    <Group
      value={forceEffectType}
      onChange={handleChange}
      options={Options.map(evolve({ label: t }))}
      optionType="button"
    />
  );
};

export default ForceEffectTypeRadio;
