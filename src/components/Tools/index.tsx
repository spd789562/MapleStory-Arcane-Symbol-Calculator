'use client';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import { useAtomValue } from 'jotai';
import { tabAtom, TabType } from '@/store/tab';

import { SymbolType } from '@/mapping/region';

const TabToSymbol = {
  [TabType.Arcane]: SymbolType.Arcane,
  [TabType.Grandis]: SymbolType.Grandis,
};

interface ToolsProps {
  ArcaneTab?: React.FC<any>;
  GrandisTab?: React.FC<any>;
  OtherToolsTab?: React.FC<any>;
  StatisticBoard?: React.FC<any>;
  ResultTable?: React.FC<any>;
  ResultChart?: React.FC<any>;
}
const Tools = (props: ToolsProps) => {
  const { ArcaneTab, GrandisTab, OtherToolsTab, StatisticBoard, ResultTable, ResultChart } = props;
  const tab = useAtomValue(tabAtom);

  return (
    <>
      <Row gutter={[8, 8]}>
        {tab === TabType.Arcane && ArcaneTab && <ArcaneTab />}
        {tab === TabType.Grandis && GrandisTab && <GrandisTab />}
        {tab === TabType.Other && OtherToolsTab && <OtherToolsTab />}
      </Row>
      {tab !== TabType.Other && (
        <Col span={24}>
          {StatisticBoard && <StatisticBoard region={TabToSymbol[tab]} />}
          {ResultTable && <ResultTable region={TabToSymbol[tab]} />}
          {ResultChart && <ResultChart region={TabToSymbol[tab]} />}
        </Col>
      )}
    </>
  );
};

export default Tools;
