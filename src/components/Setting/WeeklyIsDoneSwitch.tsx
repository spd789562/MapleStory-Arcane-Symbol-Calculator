'use client';
import { useTranslations } from 'next-intl';

import { useAtom } from 'jotai';
import { currentWeekIsDoneAtom } from '@/store/settings';

import Switch from 'antd/lib/switch';

const WeeklyIsDoneSwitch = () => {
  const t = useTranslations();
  const [isDone, setIsDone] = useAtom(currentWeekIsDoneAtom);
  const handleChange = (checked: boolean) => {
    setIsDone(checked);
  };
  return (
    <Switch
      checked={isDone}
      checkedChildren={t('setting_yes')}
      unCheckedChildren={t('setting_no')}
      onChange={handleChange}
    />
  );
};

export default WeeklyIsDoneSwitch;
