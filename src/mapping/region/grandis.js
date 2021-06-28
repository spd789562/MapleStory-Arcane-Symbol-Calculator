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
  },
  {
    name: 'hotel_arcs',
    daily: 5,
    key: 'hotelarcs',
  },
]

export default GrandisZone
