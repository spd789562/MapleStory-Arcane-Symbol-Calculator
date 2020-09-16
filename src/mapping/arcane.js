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
  { level: 0, stack: 0, count: 1, cost: '0', discount: '0' },
  { level: 1, stack: 1, count: 12, cost: '19040000', discount: '9540000' },
  {
    level: 2,
    stack: 12,
    count: 15,
    cost: '25640000',
    discount: '9010000',
  },
  {
    level: 3,
    stack: 27,
    count: 20,
    cost: '32240000',
    discount: '8480000',
  },
  {
    level: 4,
    stack: 47,
    count: 27,
    cost: '38840000',
    discount: '7950000',
  },
  {
    level: 5,
    stack: 74,
    count: 36,
    cost: '45440000',
    discount: '7420000',
  },
  {
    level: 6,
    stack: 110,
    count: 47,
    cost: '52040000',
    discount: '6890000',
  },
  {
    level: 7,
    stack: 157,
    count: 60,
    cost: '58640000',
    discount: '6360000',
  },
  {
    level: 8,
    stack: 217,
    count: 75,
    cost: '65240000',
    discount: '5830000',
  },
  {
    level: 9,
    stack: 292,
    count: 92,
    cost: '71840000',
    discount: '5300000',
  },
  {
    level: 10,
    stack: 384,
    count: 111,
    cost: '78440000',
    discount: '4770000',
  },
  {
    level: 11,
    stack: 495,
    count: 132,
    cost: '85040000',
    discount: '4240000',
  },
  {
    level: 12,
    stack: 627,
    count: 155,
    cost: '91640000',
    discount: '3710000',
  },
  {
    level: 13,
    stack: 782,
    count: 180,
    cost: '98240000',
    discount: '3180000',
  },
  {
    level: 14,
    stack: 962,
    count: 207,
    cost: '104840000',
    discount: '2650000',
  },
  {
    level: 15,
    stack: 1169,
    count: 236,
    cost: '111440000',
    discount: '2120000',
  },
  {
    level: 16,
    stack: 1405,
    count: 267,
    cost: '118040000',
    discount: '1590000',
  },
  {
    level: 17,
    stack: 1672,
    count: 300,
    cost: '124640000',
    discount: '1060000',
  },
  {
    level: 18,
    stack: 1972,
    count: 335,
    cost: '131240000',
    discount: '530000',
  },
  {
    level: 19,
    stack: 2307,
    count: 372,
    cost: '137840000',
    discount: '0',
  },
  {
    level: 20,
    stack: 2679,
    count: 0,
    cost: 0,
    discount: '0',
  },
]

export default ArcaneSymbol
