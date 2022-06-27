import ForceMapping from '../force/arcane'

const vanishingJourney = {
  base: 3110000,
  increment: 3960000,
}
const chuchu = {
  base: 6220000,
  increment: 4620000,
}
const lachelein = {
  base: 9330000,
  increment: 5280000,
}
const other = {
  base: 11196000,
  increment: 5940000,
}

const baseCostFormula = (base, increment) => (level) => {
  if (level < 1 || level > ForceMapping.symbol.maxLevel) {
    return 0
  }
  return base + level * increment
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
 */
const ArcaneRiverZone = [
  {
    name: 'vanishing_journey',
    extraRegion: 'reverse_city',
    daily: [8, 16],
    pquest: { name: 'edra_spectrum', type: 'symbol', count: 6 },
    key: 'vanishingjourney',
    levelupDiscount: true,
    costFormula: baseCostFormula(
      vanishingJourney.base,
      vanishingJourney.increment
    ),
  },
  {
    name: 'chu_chu_island',
    extraRegion: 'yum_yum_island',
    daily: [4, 8],
    pquest: { name: 'hungry_muto', type: 'symbol', dailyMax: 15 },
    key: 'chuchu',
    costFormula: baseCostFormula(chuchu.base, chuchu.increment),
  },
  {
    name: 'lachelein',
    key: 'lachelein',
    daily: 8,
    pquest: {
      name: 'dream_defender',
      type: 'coin',
      unit: 30,
      basic: 24,
      dailyMax: 500,
      desc: 'party_quest_tips_exchange_basic',
    },
    costFormula: baseCostFormula(lachelein.base, lachelein.increment),
  },
  {
    name: 'arcana',
    key: 'arcana',
    daily: 8,
    pquest: {
      name: 'spirit_savior',
      type: 'coin',
      unit: 3,
      basic: 0,
      dailyMax: 30,
    },
    costFormula: baseCostFormula(other.base, other.increment),
  },
  {
    name: 'morass',
    daily: 8,
    pquest: { name: 'ranheim_defense', type: 'symbol', count: 6 },
    key: 'morass',
    costFormula: baseCostFormula(other.base, other.increment),
  },
  {
    name: 'esfera',
    daily: 8,
    pquest: { name: 'esfera_guardian', type: 'symbol', count: 6 },
    key: 'esfera',
    costFormula: baseCostFormula(other.base, other.increment),
  },
]

export default ArcaneRiverZone
