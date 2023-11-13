'use client';
import { atom, useAtomValue } from 'jotai';

import { symbolTypeAtom } from '@/store/tab';
import { symbolLevelAndHoldSelector } from '@/store/selector';
import { roleAtom } from '@/store/settings';

import Statistic from 'antd/lib/statistic/Statistic';
import I18nText from '@/components/I18nText';

import SymbolInfo from '@/mapping/force';
import RoleMapping from '@/mapping/role';

const roleStatSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType) return 0;

  const CurrentSymbolInfo = SymbolInfo[symbolType];
  const { holdCount: symbolHoldCount, levelTotal: symbolLevelTotal } = get(
    symbolLevelAndHoldSelector,
  );
  const roleSelectIndex = get(roleAtom);

  /* stat give per level */
  const stateUnit =
    (RoleMapping[roleSelectIndex] || { unit: 100 }).unit *
    (CurrentSymbolInfo.symbol.stateMultiple || 1);

  /* stat give base */
  const statBase = CurrentSymbolInfo.symbol.getStateBasic(stateUnit);

  const statAmount = symbolLevelTotal * stateUnit + symbolHoldCount * statBase;

  return statAmount;
});

const RoleStat: React.FC = () => {
  const statAmount = useAtomValue(roleStatSelector);

  return (
    <Statistic title={<I18nText id="stat_increase" />} value={statAmount} />
  );
};

export default RoleStat;
