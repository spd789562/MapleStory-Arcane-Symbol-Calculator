'use client';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import { tableDataSelector, type ForceEffectRow } from './store';

import Table, { ColumnsType } from 'antd/lib/table';
import CheckOutlined from '@ant-design/icons/CheckOutlined';

import { evolve } from 'ramda';

const columns: ColumnsType<ForceEffectRow> = [
  {
    title: 'force_effect_current' as keyof IntlMessages,
    dataIndex: 'current',
    key: 'current',
    align: 'center',
    render: (_, record) => record.current && <CheckOutlined />,
  },
  {
    title: 'force_effect_req' as keyof IntlMessages,
    dataIndex: 'req',
    key: 'req',
    align: 'center',
  },
  {
    title: 'force_effect_damage' as keyof IntlMessages,
    dataIndex: 'damage',
    key: 'damage',
    align: 'center',
    render: (_, record) => `${Math.ceil(record.damage * 100)}%`,
  },
  {
    title: 'force_effect_encounter' as keyof IntlMessages,
    dataIndex: 'encounter',
    key: 'encounter',
    align: 'center',
    render: (_, record) => `${record.encounter}x`,
  },
];

const ResultTable: React.FC = () => {
  const tableData = useAtomValue(tableDataSelector);
  const t = useTranslations();

  return (
    <Table
      columns={columns.map(evolve({ title: (str) => t(str) }))}
      dataSource={tableData}
      pagination={false}
      scroll={{ x: '100%' }}
      size="small"
    />
  );
};

export default ResultTable;
