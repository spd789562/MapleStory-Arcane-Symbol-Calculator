export enum SymbolType {
  Grandis = 'grandis',
  Arcane = 'arcane',
}

export enum ArcaneSymbolType {
  VanishingJourney = 'vanishingjourney',
  ChuChu = 'chuchu',
  Lachelein = 'lachelein',
  Arcana = 'arcana',
  Morass = 'morass',
  Esfera = 'esfera',
}

export enum GrandisSymbolType {
  Cernium = 'cernium',
  HotelArcs = 'hotelarcs',
  Odium = 'odium',
  ShangriLa = 'shangrila',
  Arteria = 'arteria',
  Carcion = 'carcion',
}

export type SymbolRegionType = ArcaneSymbolType | GrandisSymbolType;

export interface SymbolPartyQuestData {
  /** party quest name */
  name: string;
  /** directly give symbol or coin */
  type: 'symbol' | 'coin';
  /** give count */
  count: number;
  /** party quest can done by weekly or daily */
  doneType: 'weekly' | 'daily';
}

export interface SymbolRegionData {
  /** symbol name */
  name: string;
  /** extra region name */
  extraRegion?: string;
  /** symbol daily limit */
  daily: number[] | number;
  /** symbol party quest */
  pquest?: SymbolPartyQuestData;
  /** key for mapping or something */
  key: SymbolRegionType;
  /** how many cost base on given level */
  costFormula: (level: number) => number;
  /** value might be estimate by me */
  isEstimate?: boolean;
}
