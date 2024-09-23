'use client';
import { useMemo } from 'react';
import { atom, useAtomValue } from 'jotai';

import { symbolsAtom } from '@/store/symbols';
import { symbolTypeAtom } from '@/store/tab';
import { getSymbolLevelsByRegions } from '@/store/selector';

import Statistic from 'antd/lib/statistic/Statistic';
import I18nText from '@/components/I18nText';

import SymbolInfo, { type OtherStateData } from '@/mapping/force';

const makeStateSelector = (field: 'exp' | 'mesos' | 'drop') =>
  atom((get) => {
    const symbolType = get(symbolTypeAtom);
    if (!symbolType) return 0;

    const CurrentSymbolInfo = SymbolInfo[symbolType];

    const StateInfo = CurrentSymbolInfo[field] as OtherStateData;

    if (!StateInfo) return 0;

    const avaiableSymbolLevels = getSymbolLevelsByRegions(
      symbolType,
      StateInfo?.regions || [],
      get(symbolsAtom),
    );

    return avaiableSymbolLevels.reduce(
      (acc, level) => acc + StateInfo.formula(level),
      0,
    );
  });

export interface OtherStatProps {
  field: 'exp' | 'mesos' | 'drop';
  suffix?: React.ReactNode;
}
const FieldTextMap: Record<OtherStatProps['field'], keyof IntlMessages> = {
  exp: 'exp_increase',
  mesos: 'mesos_acquisition_increase',
  drop: 'item_drop_increase',
};
const OtherStat: React.FC<OtherStatProps> = (props) => {
  const satateSelector = useMemo(
    () => makeStateSelector(props.field),
    [props.field],
  );
  const statAmount = useAtomValue(satateSelector);
  const fieldText = FieldTextMap[props.field];

  return (
    <Statistic
      title={<I18nText id={fieldText} />}
      suffix={props.suffix}
      value={statAmount}
    />
  );
};

export default OtherStat;
