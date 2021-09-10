import SymbolMapping from '../mapping/symbol'

import symbolMatch from './symbol-match'
import numberFormat from './number-format'
import { propEq } from 'ramda'
import isDiscountZone from './is-discount-zone'

/**
 * getSymbolMesosTotal
 * @desc get this symbol mesos consume
 * @param {object} param
 * @param {string} param.region - symbol region
 * @param {string} param.zone - arcane zone
 * @param {string} param.count - current arcane count
 */
const getSymbolMesosTotal = ({ region, zone, count }) => {
  const RegionSymbolMapping =
    SymbolMapping[region][zone] || SymbolMapping[region]
  const currentArcane = symbolMatch({ region, zone }, count)
  const _isDiscountZone = isDiscountZone(zone)
  const currentLevelIndex = RegionSymbolMapping.findIndex(
    propEq('level', currentArcane.level)
  )

  const totalCost = RegionSymbolMapping.slice(0, currentLevelIndex).reduce(
    (totalCost, { cost, discount }) => {
      totalCost += _isDiscountZone ? +cost - +discount : +cost
      return totalCost
    },
    0
  )
  return numberFormat(totalCost)
}

export default getSymbolMesosTotal
