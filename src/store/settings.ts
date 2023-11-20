'use client';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { withImmer } from 'jotai-immer';

export interface Settings {
  role: number;
  /** weekly party quest reset day */
  resetDay: number;
  /** current week is done */
  currentWeekIsDone: boolean;
  hyperStat: number;
  guildSkill: number;
}
const _settingsAtom = atomWithStorage<Settings>('ms_symbol_calc_Settings', {
  role: 0,
  resetDay: 3, // default reset day is Wednesday
  currentWeekIsDone: false,
  hyperStat: 0,
  guildSkill: 0,
});
export const settingsAtom = withImmer(_settingsAtom);

export const roleAtom = atom(
  (get) => get(settingsAtom).role,
  (_, set, role: Settings['role']) => {
    set(settingsAtom, (draft) => {
      draft.role = role;
    });
  },
);

export const resetDayAtom = atom(
  (get) => get(settingsAtom).resetDay,
  (_, set, resetDay: number) => {
    set(settingsAtom, (draft) => {
      draft.resetDay = resetDay;
    });
  },
);

export const currentWeekIsDoneAtom = atom(
  (get) => get(settingsAtom).currentWeekIsDone,
  (_, set, currentWeekIsDone: boolean) => {
    set(settingsAtom, (draft) => {
      draft.currentWeekIsDone = currentWeekIsDone;
    });
  },
);

export const hyperStatAtom = atom(
  (get) => get(settingsAtom).hyperStat || 0,
  (_, set, hyperStat: number) => {
    set(settingsAtom, (draft) => {
      draft.hyperStat = hyperStat;
    });
  },
);

export const guildSkillAtom = atom(
  (get) => get(settingsAtom).guildSkill || 0,
  (_, set, guildSkill: number) => {
    set(settingsAtom, (draft) => {
      draft.guildSkill = guildSkill;
    });
  },
);
