import SymbolMapping from '../mapping/symbol'
import { curry } from 'ramda'
/**
 * symbolMatch
 * @description find exp corresponding level
 * @param {number} currentExp
 * @param {string} region symbol region
 * @example
 *  symbolMatch(6) // -> { level: 1 ...}
 *  symbolMatch(24) // -> { level: 2 ...}
 */
const symbolMatch = function symbolMatch({ region }, currentExp) {
  const RegionSymbolMapping = SymbolMapping[region]
  return (
    RegionSymbolMapping.find(
      // get match range of arcane
      (symbol, index, arr) =>
        // greater then this level need and less then next level need
        currentExp >= symbol.stack &&
        currentExp < (arr[index + 1] ? arr[index + 1].stack : symbol.stack + 1)
    ) || RegionSymbolMapping[0]
  )
}

export default curry(symbolMatch)
