import { atom } from 'jotai';

import { symbolsAtom } from '@/store/symbols';
import {
  SymbolType,
  ArcaneSymbolType,
  GrandisSymbolType,
} from '@/mapping/region';

import getSymbolMesosTotal from '@/util/getSymbolMesosTotal';

export const customArcaneCountAtom = atom(0);
export const customGrandisCountAtom = atom(0);

export const symbolTypeAtom = atom(SymbolType.Arcane);

export const isUsingCustomValueAtom = atom(true);

export const arcaneSymbolTypeAtom = atom<ArcaneSymbolType>(
  ArcaneSymbolType.VanishingJourney,
);
export const grandisSymbolTypeAtom = atom<GrandisSymbolType>(
  GrandisSymbolType.Cernium,
);

/* for select */
export const currentSymbolTypeAtom = atom(
  (get) => {
    const symbolType = get(symbolTypeAtom);
    return symbolType === SymbolType.Arcane
      ? get(arcaneSymbolTypeAtom)
      : get(grandisSymbolTypeAtom);
  },
  (get, set, type) => {
    const symbolType = get(symbolTypeAtom);
    if (symbolType === SymbolType.Arcane) {
      set(arcaneSymbolTypeAtom, type as ArcaneSymbolType);
    } else {
      set(grandisSymbolTypeAtom, type as GrandisSymbolType);
    }
  },
);

export const currentCustomCountAtom = atom<number, [count: number], undefined>(
  (get) => {
    const symbolType = get(symbolTypeAtom);
    return symbolType === SymbolType.Arcane
      ? get(customArcaneCountAtom)
      : get(customGrandisCountAtom);
  },
  (get, set, count: number) => {
    const symbolType = get(symbolTypeAtom);
    if (symbolType === SymbolType.Arcane) {
      set(customArcaneCountAtom, count);
    } else {
      set(customGrandisCountAtom, count);
    }
  },
);

export const currentCountSelector = atom((get) => {
  const isCustom = get(isUsingCustomValueAtom);
  if (isCustom) {
    return get(currentCustomCountAtom);
  }
  /* get correspond symbolType */
  const regionSymbolType = get(currentSymbolTypeAtom);

  /* use real value in other tabs */
  return get(symbolsAtom)[regionSymbolType].count || 0;
});

/* after catalyst value */
export const afterCountSelector = atom((get) => {
  const multiply = get(symbolTypeAtom) === SymbolType.Arcane ? 0.8 : 0.6;
  return Math.floor(get(currentCountSelector) * multiply);
});

/* after catalyst need cost to upgrade that level */
export const afterCostSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  const regionSymbolType = get(currentSymbolTypeAtom);
  const count = get(afterCountSelector);
  return getSymbolMesosTotal({
    region: symbolType,
    zone: regionSymbolType,
    count,
  });
});
