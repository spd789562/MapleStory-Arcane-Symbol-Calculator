'use client';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { SymbolType } from '@/mapping/region';

export enum TabType {
  Arcane = 'arcane',
  Grandis = 'grandis',
  Other = 'other',
}

export const tabAtom = atomWithStorage<TabType>(
  'ms_symbol_calc_Tab',
  TabType.Arcane,
);

export const symbolTypeAtom = atom((get) => {
  const tabType = get(tabAtom);
  switch (tabType) {
    case TabType.Arcane:
      return SymbolType.Arcane;
    case TabType.Grandis:
      return SymbolType.Grandis;
    case TabType.Other:
      return undefined;
  }
});
