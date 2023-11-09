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
  ArcaneTab?: React.ReactNode;
  GrandisTab?: React.ReactNode;
  OtherToolsTab?: React.ReactNode;
  StatisticBoard?: React.ReactNode;
  ResultTable?: React.ReactNode;
  ResultChart?: React.ReactNode;
}
const Tools = (props: ToolsProps) => {
  const { ArcaneTab, GrandisTab, OtherToolsTab, StatisticBoard, ResultTable, ResultChart } = props;
  const tab = useAtomValue(tabAtom);

  return (
    <>
      <Row gutter={[8, 8]}>
        {tab === TabType.Arcane && ArcaneTab}
        {tab === TabType.Grandis && GrandisTab}
        {tab === TabType.Other && OtherToolsTab}
      </Row>
      {tab !== TabType.Other && (
        <Col span={24}>
          {StatisticBoard}
          {ResultTable}
          {ResultChart}
        </Col>
      )}
    </>
  );
};

export default Tools;
