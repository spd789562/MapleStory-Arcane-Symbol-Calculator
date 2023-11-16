'use client';
import { atom, useAtomValue } from 'jotai';

import { symbolTypeAtom } from '@/store/tab';
import {
  additionalForceSelector,
  forceProgressSelector,
} from '@/store/selector';

import Statistic from 'antd/lib/statistic/Statistic';
import I18nText from '@/components/I18nText';

import { SymbolType } from '@/mapping/region';

import numberFormat from '@/util/numberFormat';

const forceInfoSelector = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  if (!symbolType)
    return { currentForce: 0, availableForce: 0, symbolType: '' };

  const { currentForce, availableForce } = get(forceProgressSelector);
  const additionalForce = get(additionalForceSelector);

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
    />
  );
};

export default ForceProgress;
