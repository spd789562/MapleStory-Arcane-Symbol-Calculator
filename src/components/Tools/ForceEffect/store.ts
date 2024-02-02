import { atom } from 'jotai';

import { symbolsAtom } from '@/store/symbols';
import { hyperStatAtom, guildSkillAtom } from '@/store/settings';
import { getSymbolExps } from '@/store/selector';

import getSymbolForceTotal from '@/util/getSymbolForceTotal';
import { add, multiply, pipe, evolve, prop } from 'ramda';

import { SymbolType } from '@/mapping/region';
import SymbolInfo, { type ForceCalculateEffect } from '@/mapping/force';

export enum ForceEffectType {
  /** use current force data */
  Force = 'force',
  /** use custom force value */
  Custom = 'custom',
}

export const calcForceTypeAtom = atom(SymbolType.Arcane);
export const customForceAtom = atom(0);
export const targetForceAtom = atom(0);
export const forceEffectTypeAtom = atom(ForceEffectType.Force);

export const isCustomForceAtom = atom(
  (get) => get(forceEffectTypeAtom) === ForceEffectType.Custom,
);

export const currentForceSelector = atom((get) => {
  if (get(isCustomForceAtom)) {
    return get(customForceAtom);
  }
  const symbols = get(symbolsAtom);
  const symbolType = get(calcForceTypeAtom);
  const symbolExps = getSymbolExps(symbolType, symbols);
  const force = getSymbolForceTotal({
    region: symbolType,
    symbolExpList: symbolExps,
  });

  let additionalForce = 0;
  const CurrentSymbolInfo = SymbolInfo[symbolType];

  if (CurrentSymbolInfo.hyper) {
    const hyperStatLevel = get(hyperStatAtom);
    additionalForce += CurrentSymbolInfo.hyper.formula(hyperStatLevel) || 0;
  }
  if (CurrentSymbolInfo.guild) {
    const guildSkillLevel = get(guildSkillAtom);
    additionalForce += CurrentSymbolInfo.guild.formula(guildSkillLevel) || 0;
  }

  return force + additionalForce;
});

export interface ForceEffectRow extends ForceCalculateEffect {
  current?: boolean;
}
export const tableDataSelector = atom((get) => {
  const symbolType = get(calcForceTypeAtom);
  const targetForce = get(targetForceAtom);
  const currentForce = get(currentForceSelector);

  const CurrentSymbolForceInfo = SymbolInfo[symbolType].force;

  const requirementType = CurrentSymbolForceInfo.reqType;
  const calcFunc = requirementType === 'diff' ? add : multiply;

  const effectList = CurrentSymbolForceInfo.effects.map(
    evolve({ req: pipe(calcFunc(targetForce), Math.floor) }),
  );

  const paired: ForceEffectRow[] = effectList.map((item, index, list) => {
    const nextItem = list[index + 1];
    const hasNext = !!nextItem;
    const isFirstAndBelow = index === 0 && currentForce <= item.req;
    const isGraterThenReq = currentForce >= item.req;
    const isBelowNextReq = hasNext && currentForce < nextItem.req;

    if (isFirstAndBelow || (isGraterThenReq && (!hasNext || isBelowNextReq))) {
      return {
        ...item,
        current: true,
        recommend: true,
      };
    }
    return item;
  });
  return paired.filter((e) => prop('recommend', e));
});
