import { SymbolForceData } from './type';

const preventOverflowNumber = ({
  number,
  max,
  min = 0,
}: {
  number: number;
  max: number;
  min?: number;
}) => (number > max ? max : number < min ? min : number);

const ArcaneForceData: SymbolForceData = {
  force: {
    reqType: 'multiply',
    effects: [
      { req: 0, damage: 0.1, encounter: 2.8 },
      { req: 0.1, damage: 0.3, encounter: 2.4 },
      { req: 0.3, damage: 0.6, encounter: 1.8 },
      { req: 0.5, damage: 0.7, encounter: 1.6 },
      { req: 0.7, damage: 0.8, encounter: 1.4 },
      { req: 1, damage: 1, encounter: 1, recommend: true },
      { req: 1.1, damage: 1.1, encounter: 0.8 },
      { req: 1.3, damage: 1.3, encounter: 0.4, recommend: true },
      { req: 1.5, damage: 1.5, encounter: 0, recommend: true },
    ],
  },
  symbol: {
    maxLevel: 20,
    maxExp: 2679,
    forceBasic: 20,
    forceUnit: 10,
    stateMultiple: 1,
    getStateBasic: (unit) => unit * 2,
  },
  hyper: {
    maxLevel: 15,
    maxPower: 100,
    formula: (level) => {
      const _level = preventOverflowNumber({ max: 15, number: +level });
      return (_level - 10 > 0 ? _level - 10 : 0) * 5 + _level * 5;
    },
    restore: (power = 0) => {
      const _power = +power;
      return _power > 50 ? (_power - 50) / 5 + 10 : _power / 5;
    },
  },
  guild: {
    maxLevel: 4,
    maxPower: 30,
    formula: (level) => (level > 0 ? 10 + preventOverflowNumber({ max: 4, number: level }) * 5 : 0),
    restore: (power = 0) => {
      const _power = +power;
      return _power > 0 ? (_power - 10) / 5 : 0;
    },
  },
};

export default ArcaneForceData;
