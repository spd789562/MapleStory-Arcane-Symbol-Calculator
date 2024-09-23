'use client';
import { useAtomValue, atom } from 'jotai';

import { symbolTypeAtom } from '@/store/tab';
import { symbolsAtom } from '@/store/symbols';
import { getSymbolExpsByRegions } from '@/store/selector';

import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import OtherStat from './OtherStat';

import SymbolInfo from '@/mapping/force';

const regions = SymbolInfo.grandis.exp?.regions || [];

const hasAnyLevelSelector = atom((get) => {
  return getSymbolExpsByRegions(regions, get(symbolsAtom)).some(
    (exp) => exp > 0,
  );
});

const OtherStatCards: React.FC = () => {
  const symbolType = useAtomValue(symbolTypeAtom);
  const hasAnyLevel = useAtomValue(hasAnyLevelSelector);

  if (!symbolType || !hasAnyLevel) {
    return null;
  }

  const CurrentSymbolInfo = SymbolInfo[symbolType];

  /* only check exp for now */
  if (!CurrentSymbolInfo.exp) {
    return null;
  }

  return (
    <>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <OtherStat field="exp" suffix="%" />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <OtherStat field="mesos" suffix="%" />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <OtherStat field="drop" suffix="%" />
        </Card>
      </Col>
    </>
  );
};

export default OtherStatCards;
