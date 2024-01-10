import ForceMapping from '@/mapping/force/grandis';
import { SymbolRegionData, GrandisSymbolType } from './type';

const IncrementMap = {
  [GrandisSymbolType.Cernium]: 13.2,
  [GrandisSymbolType.HotelArcs]: 15,
  [GrandisSymbolType.Odium]: 16.8,
  [GrandisSymbolType.ShangriLa]: 18.6,
  [GrandisSymbolType.Arteria]: 20.4,
  [GrandisSymbolType.Carcion]: 22.2,
} as const;

const baseCostFormula = (increment: number) => (level: number) => {
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
    key: GrandisSymbolType.Cernium,
    costFormula: baseCostFormula(IncrementMap[GrandisSymbolType.Cernium]),
  },
  {
    name: 'hotel_arcs',
    daily: 10,
    key: GrandisSymbolType.HotelArcs,
    costFormula: baseCostFormula(IncrementMap[GrandisSymbolType.HotelArcs]),
  },
  {
    name: 'odium',
    daily: 10,
    key: GrandisSymbolType.Odium,
    costFormula: baseCostFormula(IncrementMap[GrandisSymbolType.Odium]),
  },
  {
    name: 'shangri_la',
    daily: 10,
    key: GrandisSymbolType.ShangriLa,
    costFormula: baseCostFormula(IncrementMap[GrandisSymbolType.ShangriLa]),
  },
  {
    name: 'arteria',
    daily: 10,
    key: GrandisSymbolType.Arteria,
    isEstimate: true,
    costFormula: baseCostFormula(IncrementMap[GrandisSymbolType.Arteria]),
  },
  {
    name: 'carcion',
    daily: 10,
    key: GrandisSymbolType.Carcion,
    isEstimate: true,
    costFormula: baseCostFormula(IncrementMap[GrandisSymbolType.Carcion]),
  },
];

export default GrandisZone;
