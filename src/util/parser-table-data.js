import ArcaneSymbolMapping from '../mapping/arcane'

import symbolMatch from './symbol-match'
import numberFormat from './number-format'

import moment from 'moment'

/**
 * parserTableData
 * @desc parser data for table
 * @param {object} param
 * @param {string} param.key - arcane key name
 * @param {string} param.level - target arcane level
 * @param {string} param.currentCount - current arcane count
 * @param {string} param.dailyTotalCount - current arcane daily able to reward count
 */
const parserTableData = ({ key, level, currentCount, dailyTotalCount }) => {
  const TargetArcane = ArcaneSymbolMapping[level]
  const currentArcane = symbolMatch(currentCount)
  const remainDays = Math.ceil(
    (TargetArcane.stack - currentCount) / dailyTotalCount
  )
  const totalCost = ArcaneSymbolMapping.reduce(
    (totalCost, { level: arcaneLevel, cost }) => {
      totalCost +=
        arcaneLevel >= currentArcane.level && arcaneLevel <= level - 1
          ? +cost
          : 0
      return totalCost
    },
    0
  )
  const completeDate = moment().add(remainDays, 'days').format('YYYY-MM-DD')
  return {
    key,
    level,
    completeDate,
    currentLevel: currentArcane.level,
    remainDays,
    completeDateText:
      moment().add(remainDays, 'days').format('YYYY-MM-DD') +
      `(${numberFormat(remainDays)}天)`,
    accumulativeNeed: TargetArcane.stack - currentCount,
    totalCost: numberFormat(totalCost),
  }
}

export default parserTableData
