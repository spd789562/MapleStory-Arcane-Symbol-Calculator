import { eqBy, path, not, is } from 'ramda'

const fieldShouldUpdate = (selector) => (prev, curr) =>
  is(Array, selector)
    ? selector.some((s) => not(eqBy(path(s), prev, curr)))
    : not(eqBy(path(selector), prev, curr))

export default fieldShouldUpdate
