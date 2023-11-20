'use client';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { withImmer } from 'jotai-immer';

import { ArcaneSymbolType, GrandisSymbolType, type SymbolRegionType } from '@/mapping/region';

const legacyStorageKey = 'MAPLESTORE_ARCANE_SYMBOL_CALCULATOR_DATA';

export interface SymbolState {
  /** daily quest */
  quest?: boolean | number;
  /** symbol level */
  count?: number;
  /** selectable */
  extra?: number;
  /** party quest */
  party?: boolean;
}
const _symbolsAtom = atomWithStorage<Record<SymbolRegionType, SymbolState>>(legacyStorageKey, {
  [ArcaneSymbolType.VanishingJourney]: {},
  [ArcaneSymbolType.ChuChu]: {},
  [ArcaneSymbolType.Lachelein]: {},
  [ArcaneSymbolType.Arcana]: {},
  [ArcaneSymbolType.Morass]: {},
  [ArcaneSymbolType.Esfera]: {},
  [GrandisSymbolType.Cernium]: {},
  [GrandisSymbolType.HotelArcs]: {},
  [GrandisSymbolType.Odium]: {},
  [GrandisSymbolType.ShangriLa]: {},
  [GrandisSymbolType.Arteria]: {},
  [GrandisSymbolType.Carcion]: {},
});
export const symbolsAtom = withImmer(_symbolsAtom);

const createSymbolStateAtoms = (symbolType: SymbolRegionType) => {
  const symbolAtom = atom((get) => get(symbolsAtom)[symbolType] || {});

  const questAtom = atom(
    (get) => get(symbolAtom).quest || false,
    (_, set, quest: SymbolState['quest']) => {
      set(symbolsAtom, (draft) => {
        draft[symbolType].quest = quest;
      });
    },
  );

  const countAtom = atom(
    (get) => get(symbolAtom).count || 0,
    (_, set, count: SymbolState['count']) => {
      set(symbolsAtom, (draft) => {
        draft[symbolType].count = count;
      });
    },
  );

  const extraAtom = atom(
    (get) => get(symbolAtom).extra || 0,
    (_, set, extra: SymbolState['extra']) => {
      set(symbolsAtom, (draft) => {
        draft[symbolType].extra = extra;
      });
    },
  );

  const partyAtom = atom(
    (get) => get(symbolAtom).party || false,
    (_, set, party: SymbolState['party']) => {
      set(symbolsAtom, (draft) => {
        draft[symbolType].party = party;
      });
    },
  );

  const addExtraToCount = atom(
    /** is disabled */
    (get) => !get(extraAtom),
    (get, set) => {
      set(countAtom, get(extraAtom) + get(countAtom));
      set(extraAtom, 0);
    },
  );

  return {
    symbolAtom,
    questAtom,
    countAtom,
    extraAtom,
    partyAtom,
    addExtraToCount,
  };
};

export const symbolAtomMap = {
  [ArcaneSymbolType.VanishingJourney]: createSymbolStateAtoms(ArcaneSymbolType.VanishingJourney),
  [ArcaneSymbolType.ChuChu]: createSymbolStateAtoms(ArcaneSymbolType.ChuChu),
  [ArcaneSymbolType.Lachelein]: createSymbolStateAtoms(ArcaneSymbolType.Lachelein),
  [ArcaneSymbolType.Arcana]: createSymbolStateAtoms(ArcaneSymbolType.Arcana),
  [ArcaneSymbolType.Morass]: createSymbolStateAtoms(ArcaneSymbolType.Morass),
  [ArcaneSymbolType.Esfera]: createSymbolStateAtoms(ArcaneSymbolType.Esfera),
  [GrandisSymbolType.Cernium]: createSymbolStateAtoms(GrandisSymbolType.Cernium),
  [GrandisSymbolType.HotelArcs]: createSymbolStateAtoms(GrandisSymbolType.HotelArcs),
  [GrandisSymbolType.Odium]: createSymbolStateAtoms(GrandisSymbolType.Odium),
  [GrandisSymbolType.ShangriLa]: createSymbolStateAtoms(GrandisSymbolType.ShangriLa),
  [GrandisSymbolType.Arteria]: createSymbolStateAtoms(GrandisSymbolType.Arteria),
  [GrandisSymbolType.Carcion]: createSymbolStateAtoms(GrandisSymbolType.Carcion),
};