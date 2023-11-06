import ForceMapping from '@/mapping/force/grandis';
import type { SymbolRegionData } from './type';

enum IncrementMap {
  cernium = 13.2,
  hotelarcs = 15,
  odium = 16.8,
  shangrila = 18.6,
  arteria = 20.4,
  carcion = 22.2,
}
const baseCostFormula = (increment: IncrementMap) => (level: number) => {
  if (level < 1 || level > ForceMapping.symbol.maxLevel) {
    return 0;
  }
  const floatResult = (9 * Math.pow(level, 2) + 20 * level) * (increment - 0.6 * level);
  const precisionResult = parseFloat(floatResult.toString()).toPrecision(12);
  return 100000 * Math.floor(+precisionResult);
};

/**
 * GrandisZone
 * @description grandis zone data
 * @type {Array<SymbolRegionData>}
 */
const GrandisZone: SymbolRegionData[] = [
  {
    name: 'cernium',
    daily: 20,
    key: 'cernium',
    costFormula: baseCostFormula(IncrementMap.cernium),
  },
  {
    name: 'hotel_arcs',
    daily: 10,
    key: 'hotelarcs',
    costFormula: baseCostFormula(IncrementMap.hotelarcs),
  },
  {
    name: 'odium',
    daily: 10,
    key: 'odium',
    costFormula: baseCostFormula(IncrementMap.odium),
  },
  {
    name: 'shangri_la',
    daily: 10,
    key: 'shangrila',
    isEstimate: true,
    costFormula: baseCostFormula(IncrementMap.shangrila),
  },
  {
    name: 'arteria',
    daily: 10,
    key: 'arteria',
    isEstimate: true,
    costFormula: baseCostFormula(IncrementMap.arteria),
  },
  {
    name: 'carcion',
    daily: 10,
    key: 'carcion',
    isEstimate: true,
    costFormula: baseCostFormula(IncrementMap.carcion),
  },
];

export default GrandisZone;
