import SymbolRegion from '../mapping/region'

import { values, flatten } from 'ramda'

export const discountZone = flatten(values(SymbolRegion))
  .filter(({ levelupDiscount }) => levelupDiscount)
  .map(({ key }) => key)

const isDiscountZone = (zone) => discountZone.indexOf(zone) !== -1

export default isDiscountZone
