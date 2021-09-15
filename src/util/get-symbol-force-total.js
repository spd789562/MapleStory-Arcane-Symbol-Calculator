import SymbolInfo from '../mapping/force'

import symbolMatch from './symbol-match'
import numberFormat from './number-format'
import { propEq } from 'ramda'
import isDiscountZone from './is-discount-zone'

/**
 * getSymbolForceTotal
 * @desc get this symbol mesos consume
 * @param {object} param
 * @param {string} param.region - symbol region
 * @param {number[]} param.zoneData - all zone symbol Count
 */
const getSymbolForceTotal = ({ region, zoneData }) => {
  const currentRegion = SymbolInfo[region]
  const { forceBasic, forceUnit } = currentRegion.symbol
  const basic = zoneData.filter((e) => e > 0).length * forceBasic
  const total = zoneData.reduce((d, count) => {
    const { level } = symbolMatch({ region, zone: 'cernium' }, count) || {
      level: 0,
    }
    return d + level * forceUnit
  }, 0)
  return basic + total
}

export default getSymbolForceTotal
