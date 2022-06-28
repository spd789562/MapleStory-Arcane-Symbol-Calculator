import RegionMapping from '../mapping/region'

import symbolMatch from './symbol-match'
import numberFormat from './number-format'
import { propEq, times } from 'ramda'

/**
 * getSymbolMesosTotal
 * @desc get this symbol mesos consume
 * @param {object} param
 * @param {string} param.region - symbol region
 * @param {string} param.zone - arcane zone
 * @param {string} param.count - current arcane count
 */
const getSymbolMesosTotal = ({ region, zone, count }) => {
  const SymbolRegion = RegionMapping[region]
  const currenSymbol = symbolMatch({ region, zone }, count)
  const costFormula = SymbolRegion.find(propEq('key', zone)).costFormula

  const totalCost = times((n) => n + 1, currenSymbol.level).reduce(
    (acc, level) => acc + costFormula(level),
    0
  )

  return numberFormat(totalCost)
}

export default getSymbolMesosTotal
