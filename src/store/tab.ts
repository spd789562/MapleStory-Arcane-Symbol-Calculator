import { atomWithStorage } from 'jotai/utils';

export enum TabType {
  Arcane = 'arcane',
  Grandis = 'grandis',
  Other = 'other',
}

export const tabAtom = atomWithStorage<TabType>('ms_symbol_calc_Tab', TabType.Arcane);
