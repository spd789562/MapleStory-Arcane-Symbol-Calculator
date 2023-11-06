/**
 * @description symbol party quest data
 */
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
  key: string;
  /** how many cost base on given level */
  costFormula: (level: number) => number;
  /** value might be estimate by me */
  isEstimate?: boolean;
}
