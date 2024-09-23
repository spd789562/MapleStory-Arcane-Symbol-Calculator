'use client';
import { atom, useAtomValue } from 'jotai';

import { symbolsAtom } from '@/store/symbols';
import { symbolTypeAtom } from '@/store/tab';
import { getSymbolLevelsByRegions } from '@/store/selector';
import { roleAtom } from '@/store/settings';

import Statistic from 'antd/lib/statistic/Statistic';
import I18nText from '@/components/I18nText';

import SymbolInfo from '@/mapping/force';
import RoleMapping from '@/mapping/role';

import { sum } from 'ramda';

const avaiableSymbolLevelsSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType) return [];

  const CurrentSymbolInfo = SymbolInfo[symbolType];
  const avaiableSymbolLevels = getSymbolLevelsByRegions(
    symbolType,
    CurrentSymbolInfo.state.regions,
    get(symbolsAtom),
  );

  return avaiableSymbolLevels;
});

const roleStatSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType) return 0;

  const CurrentSymbolInfo = SymbolInfo[symbolType];

  const avaiableSymbolLevels = get(avaiableSymbolLevelsSelector);

  const symbolHoldCount = avaiableSymbolLevels.filter(
    (level) => level > 0,
  ).length;
  const symbolLevelTotal = sum(avaiableSymbolLevels) || 0;

  const roleSelectIndex = get(roleAtom);

  /* stat give per level */
  const stateUnit =
    (RoleMapping[roleSelectIndex] || { unit: 100 }).unit *
    (CurrentSymbolInfo.state.stateMultiple || 1);

  /* stat give base */
  const statBase = CurrentSymbolInfo.state.getStateBasic(stateUnit);

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
