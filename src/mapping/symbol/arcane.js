/**
 * ArcaneSymbol
 * @description arcane river zone data
 * @type {Array<ArcaneSymbolData>}
 *
 * @typedef {object} ArcaneSymbolData
 * @property {string} level - symbol level
 * @property {string} stack - symbol current level need symbol
 * @property {number} count - symbol current level need symbol to upgrade
 * @property {number} cost - symbol current level upgrade cost
 */
const ArcaneSymbol = [
  { level: 0, stack: 0, count: 1 },
  { level: 1, stack: 1, count: 12 },
  { level: 2, stack: 12, count: 15 },
  { level: 3, stack: 27, count: 20 },
  { level: 4, stack: 47, count: 27 },
  { level: 5, stack: 74, count: 36 },
  { level: 6, stack: 110, count: 47 },
  { level: 7, stack: 157, count: 60 },
  { level: 8, stack: 217, count: 75 },
  { level: 9, stack: 292, count: 92 },
  { level: 10, stack: 384, count: 111 },
  { level: 11, stack: 495, count: 132 },
  { level: 12, stack: 627, count: 155 },
  { level: 13, stack: 782, count: 180 },
  { level: 14, stack: 962, count: 207 },
  { level: 15, stack: 1169, count: 236 },
  { level: 16, stack: 1405, count: 267 },
  { level: 17, stack: 1672, count: 300 },
  { level: 18, stack: 1972, count: 335 },
  { level: 19, stack: 2307, count: 372 },
  { level: 20, stack: 2679, count: 0 },
]

export default ArcaneSymbol
