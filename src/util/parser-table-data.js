import SymbolMapping from '../mapping/symbol'
import SymbolRegion from '../mapping/region'

import symbolMatch from './symbol-match'
import numberFormat from './number-format'

import moment from 'moment'
import { propEq } from 'ramda'
/**
 * parserTableData
 * @desc parser data for table
 * @param {object} param
 * @param {string} param.key - arcane key name
 * @param {string} param.zone - arcane zone
 * @param {number} param.level - target arcane level
 * @param {number} param.currentCount - current arcane count
 * @param {number} param.dailyTotalCount - current arcane daily able to reward count
 * @param {number} param.weeklyCount - current arcane daily able to reward count
 * @param {number} param.weekResetDay - current arcane daily able to reward count
 * @param {boolean} param.currentWeekIsDone - current arcane daily able to reward count
 */
const parserTableData = ({
  region,
  key,
  zone,
  level,
  currentCount,
  dailyTotalCount,
  weeklyCount = 0,
  weekResetDay = 3,
  currentWeekIsDone = false,
  t = (_) => _,
}) => {
  const RegionSymbolMapping = SymbolMapping[region]
  const CurrentRegionMapping = SymbolRegion[region]
  const TargetArcane = RegionSymbolMapping[level]
  const currentArcane = symbolMatch({ region }, currentCount)
  const remainSymbolCount = TargetArcane.stack - currentCount
  let remainDays = 0 // Math.ceil(remainSymbolCount / dailyTotalCount)

  const weeklyDailyCount = dailyTotalCount * 7
  const totalWeeklyCount = weeklyCount + weeklyDailyCount

  const currentDay = moment().isoWeekday()

  // get next reset date base on week, if current day is reset day, then add 1 week
  const resetDate = (
    currentDay >= weekResetDay
      ? moment().add(1, 'weeks').isoWeekday(weekResetDay).startOf('day')
      : moment().isoWeekday(weekResetDay)
  ).startOf('day')

  const beforeResetDatesDate = resetDate.diff(moment(), 'days')

  const _weekCount = currentWeekIsDone ? 0 : weeklyCount
  // get total symbols will able to get before reset date
  const beforeResetDateCount =
    beforeResetDatesDate * dailyTotalCount + _weekCount

  // can done in this week
  if (remainSymbolCount <= beforeResetDateCount) {
    // get total days will able to get before reset date
    remainDays =
      remainSymbolCount <= _weekCount
        ? 0
        : Math.ceil((remainSymbolCount - _weekCount) / dailyTotalCount)
  } else {
    // calculate from reset date
    const _remainCount = remainSymbolCount - beforeResetDateCount

    // get total full weeks
    const needWeek = Math.floor(_remainCount / totalWeeklyCount)
    const resetWeekCount = _remainCount % totalWeeklyCount

    const resetDayInWeek = resetWeekCount
      ? resetWeekCount < weeklyCount + dailyTotalCount
        ? 1
        : Math.ceil((resetWeekCount - weeklyCount) / dailyTotalCount)
      : 0
    remainDays = needWeek * 7 + resetDayInWeek + beforeResetDatesDate
  }

  const costFormula = CurrentRegionMapping.find(propEq('key', zone)).costFormula
  const totalCost = RegionSymbolMapping.reduce(
    (totalCost, { level: arcaneLevel }) => {
      totalCost +=
        arcaneLevel >= currentArcane.level && arcaneLevel <= level - 1
          ? costFormula(arcaneLevel)
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
      `(${numberFormat(remainDays)}${t('complete_days')})`,
    accumulativeNeed: remainSymbolCount,
    totalCost: numberFormat(totalCost),
  }
}

export default parserTableData
