// import { memoizeWith, identity, times, scan, add } from 'ramda'

/* formula from https://strategywiki.org/wiki/MapleStory/Grandis#Cernium */
/* 
const AUT_MAX_LEVEL = 11
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
        : 1
  })) 
*/

/* use above formula to generate below data, prevent client side and server side calculating */

/**
 * AuthenticSymbol
 * @description Authentic symbol data
 * @type {Array<ArcaneSymbolData>}
 *
 * @typedef {object} AuthenticSymbol
 * @property {string} level - symbol level
 * @property {string} stack - symbol current level need symbol
 * @property {number} count - symbol current level need symbol to upgrade
 */
// const CerniumSymbol = calcSymbol(getCerniumMesos)
const CerniumSymbol = [
  { count: 1, level: 0, stack: 0 },
  { count: 28, level: 1, stack: 1 },
  { count: 76, level: 2, stack: 29 },
  { count: 141, level: 3, stack: 105 },
  { count: 224, level: 4, stack: 246 },
  { count: 325, level: 5, stack: 470 },
  { count: 444, level: 6, stack: 795 },
  { count: 581, level: 7, stack: 1239 },
  { count: 736, level: 8, stack: 1820 },
  { count: 909, level: 9, stack: 2556 },
  { count: 1100, level: 10, stack: 3465 },
  { count: 0, level: 11, stack: 4565 },
]

export default {
  cernium: CerniumSymbol,
  hotelarcs: CerniumSymbol,
  odium: CerniumSymbol,
}
