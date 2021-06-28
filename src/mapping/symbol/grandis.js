// import { memoizeWith, identity, times, scan, add } from 'ramda'

/* formula from https://strategywiki.org/wiki/MapleStory/Grandis#Cernium */
/* 
const AUT_MAX_LEVEL = 11
const CERNIUM_BASIC = 96900000
const CERNIUM_INCREMENT = 88500000
const HOTEL_ARCS_BASIC = 106600000
const HOTEL_ARCS_INCREMENT = 97300000

const getAUTUpgradeCount = memoizeWith(identity, (level) => {
  const count = 9 * level * level + 20 * level
  switch (level) {
    case 0:
      return 1
    case 1:
      return count - 1
    case AUT_MAX_LEVEL:
      return 0
    default:
      return count
  }
})

const getMesos = (basic, increment) =>
  memoizeWith(identity, (level) =>
    level < AUT_MAX_LEVEL ? basic + increment * level : 0
  )

const getCerniumMesos = getMesos(CERNIUM_BASIC, CERNIUM_INCREMENT)

const getHotelArcsMesos = getMesos(HOTEL_ARCS_BASIC, HOTEL_ARCS_INCREMENT)


const stackSymbol = scan(
  add,
  0,
  times((level) => getAUTUpgradeCount(level), AUT_MAX_LEVEL)
)

const calcSymbol = (getRegionMesos) =>
  stackSymbol.map((stackCount, level) => ({
    level,
    stack: level === 1 ? 1 : stackCount,
    count:
      // level 0 just need 1 symbol
      level !== 0
        ? level === AUT_MAX_LEVEL
          ? 0
          : getAUTUpgradeCount(level)
        : 1,
    cost: level && getRegionMesos(level),
  })) 
*/

/* use above formula to generate below data, prevent client side and server side calculating */

/**
 * AuthenticSymbol - Cernium
 * @description Cernium symbol data
 * @type {Array<ArcaneSymbolData>}
 *
 * @typedef {object} AuthenticSymbol
 * @property {string} level - symbol level
 * @property {string} stack - symbol current level need symbol
 * @property {number} count - symbol current level need symbol to upgrade
 * @property {number} cost - symbol current level upgrade cost
 */
// const CerniumSymbol = calcSymbol(getCerniumMesos)
const CerniumSymbol = [
  {
    cost: 0,
    count: 1,
    level: 0,
    stack: 0,
  },
  {
    cost: 185400000,
    count: 28,
    level: 1,
    stack: 1,
  },
  {
    cost: 273900000,
    count: 76,
    level: 2,
    stack: 29,
  },
  {
    cost: 362400000,
    count: 141,
    level: 3,
    stack: 105,
  },
  {
    cost: 450900000,
    count: 224,
    level: 4,
    stack: 246,
  },
  {
    cost: 539400000,
    count: 325,
    level: 5,
    stack: 470,
  },
  {
    cost: 627900000,
    count: 444,
    level: 6,
    stack: 795,
  },
  {
    cost: 716400000,
    count: 581,
    level: 7,
    stack: 1239,
  },
  {
    cost: 804900000,
    count: 736,
    level: 8,
    stack: 1820,
  },
  {
    cost: 893400000,
    count: 909,
    level: 9,
    stack: 2556,
  },
  {
    cost: 981900000,
    count: 1100,
    level: 10,
    stack: 3465,
  },
  {
    cost: 0,
    count: 0,
    level: 11,
    stack: 4565,
  },
]
/**
 * AuthenticSymbol - HotelArcs
 * @description Hotel Arcs symbol data
 * @type {Array<ArcaneSymbolData>}
 *
 * @typedef {Object} ArcaneSymbolData
 * @property {string} level - symbol level
 * @property {string} stack - symbol current level need symbol
 * @property {number} count - symbol current level need symbol to upgrade
 * @property {number} cost - symbol current level upgrade cost
 */
// const HotelArcsSymbol = calcSymbol(getHotelArcsMesos)
const HotelArcsSymbol = [
  {
    cost: 0,
    count: 1,
    level: 0,
    stack: 0,
  },
  {
    cost: 203900000,
    count: 28,
    level: 1,
    stack: 1,
  },
  {
    cost: 301200000,
    count: 76,
    level: 2,
    stack: 29,
  },
  {
    cost: 398500000,
    count: 141,
    level: 3,
    stack: 105,
  },
  {
    cost: 495800000,
    count: 224,
    level: 4,
    stack: 246,
  },
  {
    cost: 593100000,
    count: 325,
    level: 5,
    stack: 470,
  },
  {
    cost: 690400000,
    count: 444,
    level: 6,
    stack: 795,
  },
  {
    cost: 787700000,
    count: 581,
    level: 7,
    stack: 1239,
  },
  {
    cost: 885000000,
    count: 736,
    level: 8,
    stack: 1820,
  },
  {
    cost: 982300000,
    count: 909,
    level: 9,
    stack: 2556,
  },
  {
    cost: 1079600000,
    count: 1100,
    level: 10,
    stack: 3465,
  },
  {
    cost: 0,
    count: 0,
    level: 11,
    stack: 4565,
  },
]
export default {
  cernium: CerniumSymbol,
  hotelarcs: HotelArcsSymbol,
}
