'use client';
import { memo, useCallback } from 'react';

import { useAtom } from 'jotai';
import { symbolAtomMap } from '@/store/symbols';

import Switch from 'antd/lib/switch';
import FormItem from '@/components/Form/FormItem';
import DailyQuestAvatar from '@/components/SymbolRegionCard/DailyQuestAvatar';

import type { SymbolRegionType } from '@/mapping/region';

interface DailyQuestSwitchProps {
  region: SymbolRegionType;
  count: number;
}
const DailyQuestSwitch: React.FC<DailyQuestSwitchProps> = ({ region, count }) => {
  const [value, setValue] = useAtom(symbolAtomMap[region].questAtom);

  const onChange = useCallback(
    (value: boolean) => {
      setValue(value);
    },
    [region],
  );

  return (
    <FormItem name="daily" label={<DailyQuestAvatar name={region} />} className="flex w-full mb-0 pr-2">
      <Switch id="daily" checkedChildren={count} unCheckedChildren="0" checked={!!value} onChange={onChange} />
    </FormItem>
  );
};

export default memo(DailyQuestSwitch);
