import SymbolMapping from '../mapping/symbol'
import SymbolRegion from '../mapping/region'

import symbolMatch from './symbol-match'
import numberFormat from './number-format'

import moment from 'moment'

const discountZone = SymbolRegion['arcane']
  .filter(({ levelupDiscount }) => levelupDiscount)
  .map(({ key }) => key)

const isDiscountZone = (zone) => discountZone.indexOf(zone) !== -1

/**
 * parserTableData
 * @desc parser data for table
 * @param {object} param
 * @param {string} param.key - arcane key name
 * @param {string} param.zone - arcane zone
 * @param {string} param.level - target arcane level
 * @param {string} param.currentCount - current arcane count
 * @param {string} param.dailyTotalCount - current arcane daily able to reward count
 */
const parserTableData = ({
  region,
  key,
  zone,
  level,
  currentCount,
  dailyTotalCount,
  t = (_) => _,
}) => {
  const RegionSymbolMapping =
    SymbolMapping[region][zone] || SymbolMapping[region]
  const TargetArcane = RegionSymbolMapping[level]
  const currentArcane = symbolMatch({ region, zone }, currentCount)
  const remainDays = Math.ceil(
    (TargetArcane.stack - currentCount) / dailyTotalCount
  )
  const totalCost = RegionSymbolMapping.reduce(
    (totalCost, { level: arcaneLevel, cost, discount }) => {
      totalCost +=
        arcaneLevel >= currentArcane.level && arcaneLevel <= level - 1
          ? isDiscountZone(zone)
            ? +cost - +discount
            : +cost
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
    accumulativeNeed: TargetArcane.stack - currentCount,
    totalCost: numberFormat(totalCost),
  }
}

export default parserTableData
