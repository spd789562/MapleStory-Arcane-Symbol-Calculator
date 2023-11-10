import SymbolInfo from '@/mapping/force';

import symbolMatch from '@/util/symbol-match';

import type { SymbolType } from '@/mapping/region';

interface GetSymbolForceTotalParam {
  region: SymbolType;
  /** all symbol exp list */
  symbolExpList: number[];
}
function getSymbolForceTotal({ region, symbolExpList }: GetSymbolForceTotalParam): number {
  const currentRegionSymbolInfo = SymbolInfo[region];
  const { forceBasic, forceUnit } = currentRegionSymbolInfo.symbol;

  const baseForce = symbolExpList.filter((e) => e > 0).length * forceBasic;
  const totalForce = symbolExpList.reduce((total, exp) => {
    const { level } = symbolMatch(region, exp) || {
      level: 0,
    };
    return total + level * forceUnit;
  }, baseForce);

  return totalForce;
}

export default getSymbolForceTotal;
