'use client';
import { memo, useCallback } from 'react';

import { useAtom } from 'jotai';
import { symbolAtomMap } from '@/store/symbols';

import Slider from 'antd/lib/slider';
import FormItem from '@/components/Form/FormItem';
import DailyQuestAvatar from '@/components/SymbolRegionCard/DailyQuestAvatar';

import type { SymbolRegionType } from '@/mapping/region';

interface DailyQuestSliderProps {
  region: SymbolRegionType;
  counts: number[];
}
const DailyQuestSlider: React.FC<DailyQuestSliderProps> = ({ region, counts }) => {
  const [value, setValue] = useAtom(symbolAtomMap[region].questAtom);

  const onChange = useCallback(
    (value: number) => {
      setValue(value);
    },
    [region],
  );

  return (
    <FormItem
      name="daily"
      label={<DailyQuestAvatar name={region} />}
      className="flex w-full mb-0 pr-2"
      wrapperCol={{ flex: 1 }}
    >
      <Slider
        step={1}
        marks={{
          0: 0,
          1: counts[0],
          2: counts[1],
        }}
        min={0}
        max={counts.length}
        tooltip={{ open: false }}
        className="mt-0"
        value={value ? Number(value) : 0}
        onChange={onChange}
      />
    </FormItem>
  );
};

export default memo(DailyQuestSlider);
