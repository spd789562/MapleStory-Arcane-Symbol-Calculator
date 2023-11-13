import { atom } from 'jotai';

import { symbolsAtom } from './symbols';
import { symbolTypeAtom } from './tab';

import { SymbolTypeMapping } from '@/mapping/region';

import { path, sum } from 'ramda';
import symbolMatch from '@/util/symbol-match';

export const symbolLevelsSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType) return [];

  const symbols = get(symbolsAtom);
  const symbolExps = SymbolTypeMapping[symbolType].map(
    (regionType) => path([regionType, 'count'], symbols) || 0,
  );
  return symbolExps.map((exp) => symbolMatch(symbolType, exp).level);
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
