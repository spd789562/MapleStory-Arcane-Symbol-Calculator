'use client';
import { memo, useCallback } from 'react';

import { useAtom } from 'jotai';
import { symbolAtomMap } from '@/store/symbols';

import Switch from 'antd/lib/switch';
import FormItem from '@/components/Form/FormItem';

import type { ArcaneSymbolType, GrandisSymbolType } from '@/mapping/region';

interface PartyQuestSwitchProps {
  region: ArcaneSymbolType | GrandisSymbolType;
  count: number;
}
const PartyQuestSwitch: React.FC<PartyQuestSwitchProps> = ({ region, count }) => {
  const [value, setValue] = useAtom(symbolAtomMap[region].partyAtom);

  const onChange = useCallback(
    (value: boolean) => {
      setValue(value);
    },
    [region],
  );

  return (
    <div className="flex items-center">
      <FormItem name="quest" id="party_quest" className="mb-0">
        <Switch id="quest" checkedChildren={count} unCheckedChildren="0" checked={value} onChange={onChange} />
      </FormItem>
    </div>
  );
};

export default memo(PartyQuestSwitch);
