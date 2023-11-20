import ForceMapping from '@/mapping/force/arcane';
import { SymbolRegionData, ArcaneSymbolType } from './type';

const IncrementMap = {
  [ArcaneSymbolType.VanishingJourney]: 8,
  [ArcaneSymbolType.ChuChu]: 10,
  [ArcaneSymbolType.Lachelein]: 12,
  [ArcaneSymbolType.Arcana]: 14,
  [ArcaneSymbolType.Morass]: 16,
  [ArcaneSymbolType.Esfera]: 18,
} as const;

const baseCostFormula = (increment: number) => (level: number) => {
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
    key: ArcaneSymbolType.VanishingJourney,
    extraRegion: 'reverse_city',
    daily: [10, 20],
    pquest: {
      name: 'edra_spectrum',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    costFormula: baseCostFormula(IncrementMap[ArcaneSymbolType.VanishingJourney]),
  },
  {
    name: 'chu_chu_island',
    key: ArcaneSymbolType.ChuChu,
    extraRegion: 'yum_yum_island',
    daily: [10, 20],
    pquest: {
      name: 'hungry_muto',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    costFormula: baseCostFormula(IncrementMap[ArcaneSymbolType.ChuChu]),
  },
  {
    name: 'lachelein',
    key: ArcaneSymbolType.Lachelein,
    daily: 20,
    pquest: {
      name: 'dream_defender',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    costFormula: baseCostFormula(IncrementMap[ArcaneSymbolType.Lachelein]),
  },
  {
    name: 'arcana',
    key: ArcaneSymbolType.Arcana,
    daily: 20,
    pquest: {
      name: 'spirit_savior',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    costFormula: baseCostFormula(IncrementMap[ArcaneSymbolType.Arcana]),
  },
  {
    name: 'morass',
    key: ArcaneSymbolType.Morass,
    daily: 20,
    pquest: {
      name: 'ranheim_defense',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    costFormula: baseCostFormula(IncrementMap[ArcaneSymbolType.Morass]),
  },
  {
    name: 'esfera',
    key: ArcaneSymbolType.Esfera,
    daily: 20,
    pquest: {
      name: 'esfera_guardian',
      type: 'symbol',
      count: 45, // 15*3
      doneType: 'weekly',
    },
    costFormula: baseCostFormula(IncrementMap[ArcaneSymbolType.Esfera]),
  },
];

export default ArcaneRiverZone;
