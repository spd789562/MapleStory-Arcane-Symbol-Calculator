const preventOverflowNumber = ({ number, max, min = 0 }) =>
  number > max ? max : number < min ? min : number

export default {
  symbol: {
    maxLevel: 20,
    maxExp: 2679,
    forceBasic: 20,
    forceUnit: 10,
    getStateBasic: (unit) => unit * 2,
  },
  hyper: {
    maxLevel: 15,
    maxPower: 100,
    /**
     * hyper stat arcane power formula, if level greater then 10, it'll increase 10 power per levels
     * @param {number} level - hyper stat level
     * @returns {number} arcane power
     * @example
     *  formula(1) // -> 5
     *  formula(11) // -> 60
     */
    formula: (level) => {
      const _level = preventOverflowNumber({ max: 15, number: +level })
      return (_level - 10 > 0 ? _level - 10 : 0) * 5 + _level * 5
    },
    /**
     * restore arcane power to hyper stat level
     * @param {number} power - arcane power
     * @returns {number} hyper stat level
     * @example
     *  restore(50) // -> 10
     *  restore(80) // -> 13
     */
    restore: (power = 0) => {
      const _power = +power
      return _power > 50 ? (_power - 50) / 5 + 10 : _power / 5
    },
  },
  guild: {
    maxLevel: 4,
    maxPower: 30,
    /**
     * guild skill arcane power formula
     * @param {number} level - guild skill level
     * @returns {number} arcane power
     * @example
     *  formula(1) // -> 15
     *  formula(4) // -> 30
     */
    formula: (level) =>
      level > 0 ? 10 + preventOverflowNumber({ max: 4, number: level }) * 5 : 0,
    /**
     * restore arcane power to guild skill level
     * @param {number} power - arcane power
     * @returns {number} guild skill level
     * @example
     *  restore(15) // -> 1
     *  restore(23) // -> 3
     */
    restore: (power = 0) => {
      const _power = +power
      return _power > 0 ? (_power - 10) / 5 : 0
    },
  },
}
