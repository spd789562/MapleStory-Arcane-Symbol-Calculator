'use client';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import {
  symbolProgressTableSelector,
  type SymbolProgressTableRowData,
} from '@/store/selector';
import { symbolTypeAtom } from '@/store/tab';

import Table from 'antd/lib/table';

import numberFormat from '@/util/numberFormat';

import SymbolInfo from '@/mapping/force';
import type { SymbolType } from '@/mapping/region';

type TranslationFunc = ReturnType<typeof useTranslations>;
type RowDataKey = keyof SymbolProgressTableRowData;

const isZeroOrMaxLevel = (
  region: SymbolType,
  row: SymbolProgressTableRowData,
) =>
  row.currentLevel === SymbolInfo[region].symbol.maxLevel ||
  row.currentLevel === 0 ||
  (row.dailyTotalCount === 0 && row.weeklyCount === 0);

const expandCellWhenMaxLevel =
  (region: SymbolType) => (row: SymbolProgressTableRowData) => {
    return isZeroOrMaxLevel(region, row) ? { colSpan: 4 } : {};
  };
const shrinkCellWhenMaxLevel =
  (region: SymbolType) => (row: SymbolProgressTableRowData) => {
    return isZeroOrMaxLevel(region, row) ? { colSpan: 0 } : {};
  };

const renderFormatNumber = (value: any) =>
  typeof value === 'number' ? numberFormat(value) : value;

const renderTextIfMaxLevel =
  (region: SymbolType, t: TranslationFunc) =>
  (value: any, row: SymbolProgressTableRowData) =>
    isZeroOrMaxLevel(region, row)
      ? row.currentLevel === SymbolInfo[region].symbol.maxLevel
        ? t('table_symbol_max')
        : row.currentLevel === 0
        ? /* display not at any level */
          t('table_symbol_none')
        : /* display never complete */
          t('table_symbol_never', { level: row.currentLevel })
      : value;

const ResultTable: React.FC = () => {
  const t = useTranslations();
  const symbolType = useAtomValue(symbolTypeAtom);
  const tableData = useAtomValue(symbolProgressTableSelector);

  const columns = useMemo(() => {
    if (!symbolType) {
      return [];
    }
    return [
      {
        title: t('table_zone'),
        dataIndex: 'name',
        key: 'name',
        width: 120,
        align: 'center' as const,
      },
      {
        title: t('table_symbol_level'),
        dataIndex: 'level',
        key: 'level',
        align: 'center' as const,
        width: 60,
        render: renderTextIfMaxLevel(symbolType, t),
        onCell: expandCellWhenMaxLevel(symbolType),
      },
      {
        title: t('complete_date'),
        dataIndex: 'completeDate',
        key: 'completeDate',
        align: 'center' as const,
        width: 190,
        render: (value: string, row: SymbolProgressTableRowData) => {
          const remainDays = row.remainDays;
          return `${value} (${numberFormat(remainDays)}${t('complete_days')})`;
        },
        onCell: shrinkCellWhenMaxLevel(symbolType),
      },
      {
        title: t('tabel_total_symbol'),
        dataIndex: 'accumulativeNeed',
        key: 'accumulativeNeed',
        align: 'center' as const,
        width: 100,
        render: renderFormatNumber,
        onCell: shrinkCellWhenMaxLevel(symbolType),
      },
      {
        title: t('tabel_total_cost'),
        dataIndex: 'totalCost',
        key: 'totalCost',
        align: 'center' as const,
        width: 120,
        render: renderFormatNumber,
        onCell: shrinkCellWhenMaxLevel(symbolType),
      },
    ];
  }, [symbolType, t]);

  if (!symbolType || !tableData) {
    return null;
  }

  return (
    <Table
      columns={columns}
      dataSource={tableData.map((data) => ({
        ...data,
        name: t(data.name as keyof IntlMessages),
      }))}
      rowKey={({ _key, key }) => _key || key}
      pagination={false}
      scroll={{ x: '100%' }}
      sticky
    />
  );
};

export default ResultTable;
