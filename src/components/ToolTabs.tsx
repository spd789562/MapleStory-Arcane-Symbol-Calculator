'use client';
import { useTranslations } from 'next-intl';

import Tabs from 'antd/lib/tabs';

import { evolve } from 'ramda';

const TabItems: { key: string; label: keyof IntlMessages }[] = [
  { key: 'arcane', label: 'arcane_river' },
  { key: 'grandis', label: 'grandis' },
  { key: 'other', label: 'other_tools' },
];

const ToolTabs = () => {
  const t = useTranslations();
  const handleChange = (value: any) => {};

  return <Tabs defaultActiveKey="arcane" onChange={handleChange} items={TabItems.map(evolve({ label: t }))} />;
};

export default ToolTabs;
