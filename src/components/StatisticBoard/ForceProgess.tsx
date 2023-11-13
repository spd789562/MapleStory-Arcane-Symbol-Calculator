'use client';
import { atom, useAtomValue } from 'jotai';

import { symbolTypeAtom } from '@/store/tab';
import { symbolLevelAndHoldSelector } from '@/store/selector';
import { hyperStatAtom, guildSkillAtom } from '@/store/settings';

import Statistic from 'antd/lib/statistic/Statistic';
import I18nText from '@/components/I18nText';

import SymbolInfo from '@/mapping/force';
import { SymbolType } from '@/mapping/region';

import numberFormat from '@/util/numberFormat';

const forceInfoSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType)
    return { currentForce: 0, availableForce: 0, symbolType: '' };

  const CurrentSymbolInfo = SymbolInfo[symbolType];
  const { holdCount: symbolHoldCount, levelTotal: symbolLevelTotal } = get(
    symbolLevelAndHoldSelector,
  );

  const currentForce =
    symbolLevelTotal * CurrentSymbolInfo.symbol.forceUnit +
    symbolHoldCount * CurrentSymbolInfo.symbol.forceBasic;
  /* max force per symbol give */
  const symbolMaxForce =
    CurrentSymbolInfo.symbol.maxLevel * CurrentSymbolInfo.symbol.forceUnit +
    CurrentSymbolInfo.symbol.forceBasic;
  const availableForce = symbolHoldCount * symbolMaxForce;

  let additionalForce = 0;

  if (CurrentSymbolInfo.hyper) {
    const hyperStatLevel = get(hyperStatAtom);
    additionalForce += CurrentSymbolInfo.hyper.formula(hyperStatLevel) || 0;
  }

  if (CurrentSymbolInfo.guild) {
    const guildSkillLevel = get(guildSkillAtom);
    additionalForce += CurrentSymbolInfo.guild.formula(guildSkillLevel) || 0;
  }

  return {
    currentForce: currentForce + additionalForce,
    availableForce: availableForce + additionalForce,
    symbolType,
  };
});

const ForceProgress: React.FC = () => {
  const { currentForce, availableForce, symbolType } =
    useAtomValue(forceInfoSelector);

  if (availableForce === 0) {
    return null;
  }

  return (
    <Statistic
      title={
        <I18nText
          id={
            symbolType === SymbolType.Arcane
              ? 'arcane_force'
              : 'authentic_force'
          }
        />
      }
      value={numberFormat(currentForce)}
      suffix={`/${numberFormat(availableForce)}`}
      precision={0}
      valueStyle={{ color: '#3f8600' }}
    />
  );
};

export default ForceProgress;
