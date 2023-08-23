import ForceMapping from '../force/grandis'

const IncrementMap = {
  cernium: 13.2,
  hotelarcs: 15,
  odium: 16.8,
  shangrila: 18.6,
  arteria: 20.4,
  carcion: 22.2,
}
const baseCostFormula = (increment) => (level) => {
  if (level < 1 || level > ForceMapping.symbol.maxLevel) {
    return 0
  }
  const floatResult =
    (9 * Math.pow(level, 2) + 20 * level) * (increment - 0.6 * level)
  const precisionResult = parseFloat(floatResult).toPrecision(12)
  return 100000 * Math.floor(+precisionResult)
}

/**
 * GrandisZone
 * @description grandis zone data
 * @type {Array<ZoneData>}
 *
 * @typedef {object} ZoneData
 * @property {string} name - zone name
 * @property {string} extraRegion - extra zone name
 * @property {string} key - zone key
 * @property {number} daily - get symbol by daily quest everyday
 */
const GrandisZone = [
  {
    name: 'cernium',
    extraRegion: 'burning_cernium',
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
    costFormula: baseCostFormula(IncrementMap.shangrila),
  },
  {
    name: 'arteria',
    daily: 10,
    key: 'arteria',
    costFormula: baseCostFormula(IncrementMap.arteria),
  },
]

export default GrandisZone
