'use client';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import { symbolTypeAtom } from '@/store/tab';

import Card from 'antd/lib/card';

import { SymbolType } from '@/mapping/region';

const ChartCard = ({ children }: React.PropsWithChildren) => {
  const symbolType = useAtomValue(symbolTypeAtom);
  const t = useTranslations();

  if (!symbolType) {
    return null;
  }

  const forceText =
    symbolType === SymbolType.Arcane ? 'arcane_force' : 'authentic_force';

  return (
    <Card title={`${t(forceText)} ${t('chart_title')}`} className="mt-2">
      {children}
    </Card>
  );
};

export default ChartCard;
