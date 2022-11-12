import ForceMapping from '../force/grandis'

const autBase = (level) => Math.floor(970.2 + 884.4 * level)

const cerniumFormula = (level) => 100000 * autBase(level)
const hotelFormula = (level) => 100000 * Math.floor(1.1 * autBase(level))
const odiumFormula = (level) => 100000 * Math.floor(1.1 * autBase(level))

const baseCostFormula = (formula) => (level) => {
  if (level < 1 || level > ForceMapping.symbol.maxLevel) {
    return 0
  }
  return formula(level)
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
    daily: [5, 10],
    key: 'cernium',
    costFormula: baseCostFormula(cerniumFormula),
  },
  {
    name: 'hotel_arcs',
    daily: 5,
    key: 'hotelarcs',
    costFormula: baseCostFormula(hotelFormula),
  },
  {
    name: 'odium',
    daily: 5,
    key: 'odium',
    costFormula: baseCostFormula(odiumFormula),
  },
]

export default GrandisZone
