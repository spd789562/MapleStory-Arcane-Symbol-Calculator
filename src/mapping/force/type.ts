import type { SymbolRegionType } from '@/mapping/region/type';

export interface ForceCalculateEffect {
  /** mate of require value */
  req: number;
  /** when mate value, damage effect for mobs */
  damage: number;
  /** when mate value, damage will encounter */
  encounter: number;
  /** recommend level */
  recommend?: boolean;
}

export interface ForceCalculateData {
  /** calculate force effect use add/sub or multiply */
  reqType: 'diff' | 'multiply';
  /** force effect values */
  effects: ForceCalculateEffect[];
}

export interface SymbolStateData {
  /** symbol max level */
  maxLevel: number;
  /** symbol max exp(count) */
  maxExp: number;
  /** symbol force will give default */
  forceBasic: number;
  /** symbol force will give per level */
  forceUnit: number;
  /** symbol state will give multiply */
  stateMultiple: number;
  /** symbol state will give by default base on stat unit */
  getStateBasic: (unit: number) => number;
}

export interface SymbolMainStateData {
  regions: SymbolRegionType[];
  /** symbol state will give multiply */
  stateMultiple: number;
  /** symbol state will give by default base on stat unit */
  getStateBasic: (unit: number) => number;
}

export interface OtherStateData {
  regions: SymbolRegionType[];
  formula: (level: number) => number;
}

export interface ExtraStateData {
  maxLevel: number;
  maxPower: number;
  /** hyper stat formula, turn level to force */
  formula: (level: number) => number;
  /** hyper stat formula, turn force to level */
  restore: (power: number) => number;
}

export interface HyperStateData extends ExtraStateData {
  /**
   * hyper stat arcane power formula, if level greater then 10, it'll increase 10 power per levels
   * @param level - hyper stat level
   * @returns arcane power
   * @example
   *  formula(1) // -> 5
   *  formula(11) // -> 60
   */
  formula: (level: number) => number;
  /**
   * restore arcane power to hyper stat level
   * @param power - arcane power
   * @returns hyper stat level
   * @example
   *  restore(50) // -> 10
   *  restore(80) // -> 13
   */
  restore: (power: number) => number;
}
export interface GuildStateData extends ExtraStateData {
  /**
   * guild skill arcane power formula, just 10 plus 5 per level
   * @param level - guild skill level
   * @returns arcane power
   * @example
   *  formula(1) // -> 15
   *  formula(4) // -> 30
   */
  formula: (level: number) => number;
  /**
   * restore arcane power to guild skill level
   * @param power - arcane power
   * @returns guild skill level
   * @example
   *  restore(15) // -> 1
   *  restore(23) // -> 3
   */
  restore: (power: number) => number;
}

export interface SymbolForceData {
  /** force effect data */
  force: ForceCalculateData;
  /** symbol state data */
  symbol: SymbolStateData;
  /** symbol main state data like str, dex..etc. */
  state: SymbolMainStateData;
  exp?: OtherStateData;
  mesos?: OtherStateData;
  drop?: OtherStateData;
  /** hyper state data */
  hyper?: HyperStateData;
  /** guild state data */
  guild?: GuildStateData;
}
