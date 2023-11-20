'use client';
import { useAtomValue } from 'jotai';

import { afterCostSelector } from './store';

import I18nText from '@/components/I18nText';

const CostToUpgrade = () => {
  const afterCost = useAtomValue(afterCostSelector);

  return (
    <div>
      <I18nText id="catalyst_upgrade_cost" />: {afterCost}
    </div>
  );
};

export default CostToUpgrade;
