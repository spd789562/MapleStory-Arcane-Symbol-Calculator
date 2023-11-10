import SymbolLevelInfo, { type SymbolLevelData } from '@/mapping/symbol';

import type { SymbolType } from '@/mapping/region';

const defaultSymbolLevelInfo: SymbolLevelData = {
  level: 0,
  count: 0,
  stack: 0,
};

const symbolMatch = (symbol: SymbolType, totalExp: number) =>
  SymbolLevelInfo[symbol].find(
    (symbol, index, symbolLevelData) =>
      totalExp >= symbol.stack && totalExp < (symbolLevelData[index + 1]?.stack || symbol.stack + 1),
  ) || defaultSymbolLevelInfo;

export default symbolMatch;
