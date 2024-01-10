'use client';
import { useTranslations } from 'next-intl';

import { useAtom } from 'jotai';
import { tabAtom, TabType } from '@/store/tab';

import Tabs from 'antd/lib/tabs';

import { evolve } from 'ramda';

const TabItems: { key: string; label: keyof IntlMessages }[] = [
  { key: 'arcane', label: 'arcane_river' },
  { key: 'grandis', label: 'grandis' },
  { key: 'other', label: 'other_tools' },
];

const ToolTabs = () => {
  const t = useTranslations();
  const [tab, setTab] = useAtom(tabAtom);
  const handleChange = (key: string) => {
    setTab(key as TabType);
  };

  return <Tabs activeKey={tab} onChange={handleChange} items={TabItems.map(evolve({ label: t }))} />;
};

export default ToolTabs;
