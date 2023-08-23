import ForceMapping from '../force/arcane'

const IncrementMap = {
  vanishingJourney: 8,
  chuchu: 10,
  lachelein: 12,
  arcana: 14,
  morass: 16,
  esfera: 18,
}

const baseCostFormula = (increment) => (level) => {
  if (level < 1 || level > ForceMapping.symbol.maxLevel) {
    return 0
  }
  const floatResult = (level * level + 11) * (increment + 0.1 * level)
  const precisionResult = parseFloat(floatResult).toPrecision(12)
  return 10000 * Math.floor(+precisionResult)
}

/**
 * ArcaneRiverZone
 * @description arcane river zone data
 * @type {Array<ZoneData>}
 *
 * @typedef {object} ZoneData
 * @property {string} name - zone name
 * @property {string} key - zone key
 * @property {number} daily - get symbol by daily quest everyday
 * @property {Object} [pquest] - party quest data
 * @property {string} pquest.name - party quest name
 * @property {'symbol'|'coin'} pquest.type - party quest reward type
 * @property {number} [pquest.count] - party quest reward count
 * @property {number} [pquest.dailyMax] - party quest reward limit
 * @property {number} [pquest.basic] - party quest basic reward
 * @property {number} [pquest.unit] - party quest reward exchange to symbol need
 * @property {number} [pquest.desc] - custom description
 * @property {'weekly'|'daily'} [pquest.doneType] - party quest that can done daily or weekly
 */
const ArcaneRiverZone = [
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
    levelupDiscount: true,
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
]

export default ArcaneRiverZone
