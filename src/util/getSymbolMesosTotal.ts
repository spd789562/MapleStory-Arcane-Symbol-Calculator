import SymbolRegionData from '@/mapping/region';

import symbolMatch from './symbol-match';
import numberFormat from './numberFormat';
import { propEq, times } from 'ramda';

import type { SymbolType, SymbolRegionType } from '@/mapping/region';

interface GetSymbolMesosTotalParam {
  region: SymbolType;
  zone: SymbolRegionType;
  /** symbol exp */
  count: number;
}

/**
 * @desc get this symbol mesos consume
 */
const getSymbolMesosTotal = ({
  region,
  zone,
  count,
}: GetSymbolMesosTotalParam) => {
  const SymbolRegion = SymbolRegionData[region];
  const currenSymbol = symbolMatch(region, count);
  const costFormula = SymbolRegion.find(propEq(zone, 'key'))!.costFormula;

  const totalCost = times((n) => n + 1, currenSymbol.level).reduce(
    (acc, level) => acc + costFormula(level),
    0,
  );

  return numberFormat(totalCost);
};

export default getSymbolMesosTotal;
