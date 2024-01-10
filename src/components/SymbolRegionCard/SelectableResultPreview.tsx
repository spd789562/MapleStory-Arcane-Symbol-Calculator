'use client';
import { useMemo } from 'react';
import { useAtomValue, atom } from 'jotai';

import { symbolAtomMap } from '@/store/symbols';

import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';

import symbolMatch from '@/util/symbol-match';

import type { SymbolType, SymbolRegionType } from '@/mapping/region';

const createPreviewAtom = (region: SymbolType, name: SymbolRegionType) => {
  return atom((get) => {
    const extra = get(symbolAtomMap[name].extraAtom);
    const total = get(symbolAtomMap[name].countAtom) + extra;
    const match = symbolMatch(region, total);

    return {
      level: match.level,
      exp: total - match.stack,
      isHidden: extra === 0,
    };
  });
};

interface SelectableResultPreviewProps {
  region: SymbolType;
  name: SymbolRegionType;
}
const SelectableResultPreview: React.FC<SelectableResultPreviewProps> = ({ region, name }) => {
  /* it seems none sense though.... */
  const previewAtom = useMemo(() => createPreviewAtom(region, name), [region, name]);
  const { level, exp, isHidden } = useAtomValue(previewAtom);

  if (isHidden) {
    return null;
  }

  return (
    <span className="inline-block pt-1">
      <ArrowRightOutlined className="mx-1" />
      {`Lv.${level} / ` + `${exp}`}
    </span>
  );
};

export default SelectableResultPreview;
