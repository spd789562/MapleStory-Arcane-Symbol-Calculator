'use client';
import { useTranslations } from 'next-intl';
// import { useAtom } from 'jotai';

import Switch from 'antd/lib/switch';

const WeeklyIsDoneSwitch = () => {
  const t = useTranslations();
  const handleChange = (checked: boolean) => {};
  return <Switch checkedChildren={t('setting_yes')} unCheckedChildren={t('setting_no')} onChange={handleChange} />;
};

export default WeeklyIsDoneSwitch;
