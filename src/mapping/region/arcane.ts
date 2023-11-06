import ForceMapping from '@/mapping/force/arcane';
import type { SymbolRegionData } from './type';

enum IncrementMap {
  vanishingJourney = 8,
  chuchu = 10,
  lachelein = 12,
  arcana = 14,
  morass = 16,
  esfera = 18,
}

const baseCostFormula = (increment: IncrementMap) => (level: number) => {
  if (level < 1 || level > ForceMapping.symbol.maxLevel) {
    return 0;
  }
  const floatResult = (level * level + 11) * (increment + 0.1 * level);
  const precisionResult = parseFloat(floatResult.toString()).toPrecision(12);
  return 10000 * Math.floor(+precisionResult);
};

/**
 * ArcaneRiverZone
 * @description arcane river zone data
 * @type {Array<SymbolRegionData>}
 */
const ArcaneRiverZone: SymbolRegionData[] = [
  {
    name: 'vanishing_journey',
    extraRegion: 'reverse_city',
    daily: [10, 20],
    pquest: {
      name: 'edra_spectrum',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    key: 'vanishingjourney',
    costFormula: baseCostFormula(IncrementMap.vanishingJourney),
  },
  {
    name: 'chu_chu_island',
    extraRegion: 'yum_yum_island',
    daily: [10, 20],
    pquest: {
      name: 'hungry_muto',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    key: 'chuchu',
    costFormula: baseCostFormula(IncrementMap.chuchu),
  },
  {
    name: 'lachelein',
    key: 'lachelein',
    daily: 20,
    pquest: {
      name: 'dream_defender',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    costFormula: baseCostFormula(IncrementMap.lachelein),
  },
  {
    name: 'arcana',
    key: 'arcana',
    daily: 20,
    pquest: {
      name: 'spirit_savior',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    costFormula: baseCostFormula(IncrementMap.arcana),
  },
  {
    name: 'morass',
    daily: 20,
    pquest: {
      name: 'ranheim_defense',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    key: 'morass',
    costFormula: baseCostFormula(IncrementMap.morass),
  },
  {
    name: 'esfera',
    daily: 20,
    pquest: {
      name: 'esfera_guardian',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    key: 'esfera',
    costFormula: baseCostFormula(IncrementMap.esfera),
  },
];

export default ArcaneRiverZone;
