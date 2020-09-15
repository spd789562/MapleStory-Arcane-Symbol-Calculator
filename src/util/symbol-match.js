import ArcaneSymbolMapping from '../mapping/arcane'

/**
 * symbolMatch
 * @description find exp corresponding level
 * @param {number} currentExp
 * @example
 *  symbolMatch(6) // -> { level: 1 ...}
 *  symbolMatch(24) // -> { level: 2 ...}
 */
const symbolMatch = function symbolMatch(currentExp) {
  return (
    ArcaneSymbolMapping.find(
      // get match range of arcane
      (symbol, index, arr) =>
        // greater then this level need and less then next level need
        currentExp >= symbol.stack &&
        currentExp < (arr[index + 1] ? arr[index + 1].stack : symbol.stack + 1)
    ) || ArcaneSymbolMapping[0]
  )
}

export default symbolMatch
