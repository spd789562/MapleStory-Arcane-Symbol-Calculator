import { atom } from 'jotai';

import { symbolsAtom, type SymbolState } from './symbols';
import { symbolTypeAtom } from './tab';
import {
  resetDayAtom,
  currentWeekIsDoneAtom,
  hyperStatAtom,
  guildSkillAtom,
} from './settings';

import SymbolInfo from '@/mapping/force';
import SymbolLevelInfo from '@/mapping/symbol';
import SymbolRegionInfo, {
  SymbolTypeMapping,
  SymbolType,
} from '@/mapping/region';

import { path, sum } from 'ramda';
import symbolMatch from '@/util/symbol-match';
import {
  calcToTargetLevelData,
  getDailyQuestCount,
  getPartyQuestCountByType,
  type ToTargetLevelData,
} from '@/util/calcToTargetLevelData';

export const getSymbolLevels = (
  symbolType: SymbolType,
  symbolDatas: Record<string, SymbolState>,
) => {
  const symbolExps = SymbolTypeMapping[symbolType].map(
    (regionType) => path([regionType, 'count'], symbolDatas) || 0,
  );
  return symbolExps.map((exp) => symbolMatch(symbolType, exp).level);
};

export const symbolLevelsSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType) return [];

  const symbols = get(symbolsAtom);
  return getSymbolLevels(symbolType, symbols);
});

export const symbolLevelAndHoldSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType)
    return {
      holdCount: 0,
      levelTotal: 0,
    };
  const symbolLevels = get(symbolLevelsSelector);
  const symbolHoldCount = symbolLevels.filter((level) => level > 0).length;
  const symbolLevelTotal = sum(symbolLevels) || 0;

  return {
    holdCount: symbolHoldCount,
    levelTotal: symbolLevelTotal,
  };
});

export const forceProgressSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType)
    return {
      holdCount: 0,
      levelTotal: 0,
      currentForce: 0,
      availableForce: 0,
    };

  const CurrentSymbolInfo = SymbolInfo[symbolType];

  const { holdCount: symbolHoldCount, levelTotal: symbolLevelTotal } = get(
    symbolLevelAndHoldSelector,
  );

  const currentForce =
    symbolLevelTotal * CurrentSymbolInfo.symbol.forceUnit +
    symbolHoldCount * CurrentSymbolInfo.symbol.forceBasic;
  /* max force per symbol give */
  const symbolMaxForce =
    CurrentSymbolInfo.symbol.maxLevel * CurrentSymbolInfo.symbol.forceUnit +
    CurrentSymbolInfo.symbol.forceBasic;
  const availableForce = symbolHoldCount * symbolMaxForce;

  return {
    holdCount: symbolHoldCount,
    levelTotal: symbolLevelTotal,
    currentForce,
    availableForce,
  };
});

export const hyperStatForceSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType) return 0;

  const CurrentSymbolInfo = SymbolInfo[symbolType];

  if (CurrentSymbolInfo.hyper) {
    const hyperStatLevel = get(hyperStatAtom);
    return CurrentSymbolInfo.hyper.formula(hyperStatLevel) || 0;
  }
  return 0;
});

export const guildSkillForceSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType) return 0;

  const CurrentSymbolInfo = SymbolInfo[symbolType];

  if (CurrentSymbolInfo.guild) {
    const guildSkillLevel = get(guildSkillAtom);
    return CurrentSymbolInfo.guild.formula(guildSkillLevel) || 0;
  }
  return 0;
});

export const additionalForceSelector = atom((get) => {
  return get(hyperStatForceSelector) + get(guildSkillForceSelector);
});

export interface SymbolProgressTableChildData extends ToTargetLevelData {
  _key: string;
}
export interface SymbolProgressTableRowData extends ToTargetLevelData {
  _key: string;
  name: string;
  dailyTotalCount: number;
  weeklyCount: number;
  currentCount: number;
  children?: SymbolProgressTableChildData[];
}

export const symbolProgressTableSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType) return null;

  const resetDay = get(resetDayAtom);
  const currentWeekIsDone = get(currentWeekIsDoneAtom);
  const symbols = get(symbolsAtom);

  const SymbolMaxLevel = SymbolInfo[symbolType].symbol.maxLevel;
  const CurrentSymbolRegionInfo = SymbolRegionInfo[symbolType];
  const CurrentSymbolLevelInfo = SymbolLevelInfo[symbolType];

  const tableData = CurrentSymbolRegionInfo.map((regionData) => {
    const data = symbols[regionData.key] || {};
    return {
      ...regionData,
      currentCount: data.count || 0,
      dailyQuest: data.quest || false,
      dailyParty: data.party || false,
    };
  })
    .filter(({ currentCount }) => currentCount > 0)
    .map((regionData) => {
      const { name, key, daily, pquest, currentCount, dailyQuest, dailyParty } =
        regionData;
      const dailyQuestCount = getDailyQuestCount(daily, dailyQuest);
      const dailyPartyQuestCount = getPartyQuestCountByType(
        pquest,
        dailyParty,
        'daily',
      );
      const weeklyPartyQuestCount = getPartyQuestCountByType(
        pquest,
        dailyParty,
        'weekly',
      );

      const dailyTotalCount = dailyQuestCount + dailyPartyQuestCount;

      const tableCommonData = {
        key,
        currentCount,
        dailyTotalCount,
        currentWeekIsDone,
        region: symbolType,
        weeklyCount: weeklyPartyQuestCount,
        weekResetDay: resetDay,
      };

      const subTableData: SymbolProgressTableChildData[] =
        (dailyTotalCount > 0 || weeklyPartyQuestCount > 0) && currentCount > 0
          ? CurrentSymbolLevelInfo.filter(({ stack }) => {
              return currentCount < stack;
            })
              .map(({ level }) =>
                calcToTargetLevelData({
                  ...tableCommonData,
                  level,
                }),
              )
              .map((data) => ({ ...data, _key: `${key}-${data.level}` }))
          : ([] as SymbolProgressTableChildData[]);

      return {
        ...calcToTargetLevelData({
          ...tableCommonData,
          level: SymbolMaxLevel,
        }),
        _key: key as string,
        dailyTotalCount,
        weeklyCount: weeklyPartyQuestCount,
        currentCount,
        name,
        ...(subTableData.length ? { children: subTableData } : {}),
      };
    });

  return tableData as SymbolProgressTableRowData[];
});
