'use client';
import { useAtomValue, atom } from 'jotai';
import { useTranslations } from 'next-intl';

import {
  additionalForceSelector,
  symbolProgressTableSelector,
} from '@/store/selector';
import { symbolTypeAtom } from '@/store/tab';

import type { LineConfig } from '@ant-design/plots/lib/components/line';

import dayjs from 'dayjs';
import { evolve } from 'ramda';
import dynamic from 'next/dynamic';

import SymbolInfo from '@/mapping/force';
import { SymbolType } from '@/mapping/region';

const Line = dynamic(() => import('@ant-design/plots/lib/components/line'), {
  ssr: false,
});

const chartDataAtom = atom((get) => {
  const symbolType = get(symbolTypeAtom);
  const tableData = get(symbolProgressTableSelector);

  if (!symbolType || !tableData) {
    return [];
  }
  const today = dayjs().format('YYYY-MM-DD');
  const additionalForce = get(additionalForceSelector);
  const symbolInfo = SymbolInfo[symbolType].symbol;

  const _data = Object.entries(
    tableData
      .filter(({ currentLevel }) => currentLevel)
      .reduce(
        (acc, inc) => {
          const levelForce =
            inc.currentLevel * symbolInfo.forceUnit + symbolInfo.forceBasic;

          /* total up base force */
          acc[today] = (acc[today] || 0) + levelForce;

          if (inc.children) {
            inc.children.forEach(({ completeDate }) => {
              /* total up certain complete date force */
              acc[completeDate] =
                (acc[completeDate] || 0) + symbolInfo.forceUnit;
            });
          }
          return acc;
        },
        /* { [date]: force,... } */
        { [today]: additionalForce || 0 } as Record<string, number>,
      ),
  ).map(([date, value]) => ({ date, value }));

  const chartData = _data
    /* sort upward */
    .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
    .reduce(
      (acc, inc) => {
        acc.stack += inc.value;
        /* use current stack in chart */
        acc.data.push({
          date: inc.date,
          value: acc.stack,
        });
        return acc;
      },
      { data: [], stack: 0 } as {
        data: { date: string; value: number }[];
        stack: number;
      },
    ).data;
  const forceText =
    symbolType === SymbolType.Arcane ? 'arcane_force' : 'authentic_force';

  return chartData.map(({ date, value }) => ({
    type: forceText as keyof IntlMessages,
    value,
    date,
  }));
});

const PartialChartConfig: LineConfig = {
  height: 400,
  forceFit: true,
  data: [],
  encode: {
    x: 'date',
    y: 'value',
    series: 'type',
  },
  scale: {
    x: { nice: true },
  },
  padding: 'auto',
  legend: false,
  axis: {
    x: {
      title: false,
      tick: true,
      labelAutoHide: 'greedy',
    },
    y: {
      title: false,
      tick: true,
    },
  },
  tooltip: {
    title: 'date',
    // items: ['value'],
  },
  children: [
    {
      type: 'line',
    },
    {
      type: 'point',
      tooltip: false,
      style: {
        stroke: 'transparent',
        fill: '#5b8ff9',
      },
    },
  ],
};

const ResultChart: React.FC = () => {
  const chartData = useAtomValue(chartDataAtom);
  const t = useTranslations();

  return (
    <Line
      {...PartialChartConfig}
      key={`${chartData.length}-${Math.random()}}`}
      data={chartData.map(evolve({ type: t }))}
      className="bg-white mt-2"
    />
  );
};

export default ResultChart;
