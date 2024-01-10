import { SymbolForceData } from './type';

const GrandisForceData: SymbolForceData = {
  force: {
    reqType: 'diff',
    effects: [
      { req: -100, damage: 0.05, encounter: 2 },
      { req: -90, damage: 0.1, encounter: 2 },
      { req: -80, damage: 0.2, encounter: 2 },
      { req: -70, damage: 0.3, encounter: 2 },
      { req: -60, damage: 0.4, encounter: 2 },
      { req: -50, damage: 0.5, encounter: 1.5 },
      { req: -40, damage: 0.6, encounter: 1.5 },
      { req: -30, damage: 0.7, encounter: 1.5 },
      { req: -20, damage: 0.8, encounter: 1.5 },
      { req: -10, damage: 0.9, encounter: 1.5 },
      { req: 0, damage: 1, encounter: 1, recommend: true },
      { req: 10, damage: 1.05, encounter: 1 },
      { req: 20, damage: 1.1, encounter: 1 },
      { req: 30, damage: 1.15, encounter: 1, recommend: true },
      { req: 40, damage: 1.2, encounter: 1 },
      { req: 50, damage: 1.25, encounter: 1, recommend: true },
    ],
  },
  symbol: {
    maxLevel: 11,
    maxExp: 4565,
    forceBasic: 0,
    forceUnit: 10,
    stateMultiple: 2,
    getStateBasic: (unit) => (unit / 2) * 3,
  },
};

export default GrandisForceData;
