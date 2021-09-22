import React, { useEffect, useState, useMemo } from 'react'
import {
  Space,
  Row,
  Col,
  Card,
  Tooltip,
  Select,
  Table,
  Form,
  InputNumber,
  Radio,
} from 'antd'

/* component */
import { CheckOutlined } from '@ant-design/icons'

/* mapping */
import SymbolRegion from '../mapping/region'
import SymbolInfo from '../mapping/force'

/* helper */
import { withTranslation } from '@i18n'
import { keys, prop, evolve, identity, multiply, add, pipe } from 'ramda'
import getSymbolForceTotal from '../util/get-symbol-force-total'

const RegionOptions = keys(SymbolInfo).map((region) => ({
  value: region,
  label: region === 'arcane' ? 'arcane_river' : region,
}))

const CustomOptions = [
  {
    value: 'false',
    label: 'use_force',
  },
  {
    value: 'true',
    label: 'option_custom',
  },
]

const columns = [
  {
    title: 'force_effect_current',
    dataIndex: 'current',
    key: 'current',
    align: 'center',
    render: (_, record) => record.current && <CheckOutlined />,
  },
  {
    title: 'force_effect_req',
    dataIndex: 'req',
    key: 'req',
    align: 'center',
    // render: (_, record) => `${record.first ? '<=' : '>='}${record.req}`,
  },
  {
    title: 'force_effect_damage',
    dataIndex: 'damage',
    key: 'damage',
    align: 'center',
    render: (_, record) => `${Math.ceil(record.damage * 100)}%`,
  },
  {
    title: 'force_effect_encounter',
    dataIndex: 'encounter',
    key: 'encounter',
    align: 'center',
    render: (_, record) => `${record.encounter}x`,
  },
]

const ForceEffect = ({ t, getFieldValue }) => {
  const [region, setRegion] = useState(RegionOptions[0].value)
  const [customForce, setCustomForce] = useState(false)
  const [mobForce, setMobForce] = useState(10)
  const [currentForce, setCurrentForce] = useState(10)
  useEffect(() => {
    if (!customForce) {
      const zoneData = SymbolRegion[region]
        .map(prop('key'))
        .map((key) => getFieldValue(key)?.count || 0)
      const forceTotal = getSymbolForceTotal({ region, zoneData })
      setCurrentForce(forceTotal)
    }
  }, [region, customForce])

  const tableData = useMemo(() => {
    const reqType = SymbolInfo[region].force.reqType
    const calcFunc = reqType === 'diff' ? add : multiply
    const basic = SymbolInfo[region].force.effects.map(
      evolve({ req: pipe(calcFunc(mobForce), Math.floor) })
    )
    const paired = basic.map((item, index) => {
      const nextItem = basic[index + 1]
      if (index === 0) {
        item.first = true
      }
      if (
        (index === 0 && currentForce <= item.req) ||
        (currentForce >= item.req && (!nextItem || currentForce < nextItem.req))
      ) {
        item.current = true
        item.recommend = true
      }
      return item
    })
    return paired.filter(prop('recommend'))
  }, [region, mobForce, currentForce])

  return (
    <Card
      title={
        <Space>
          {t('force_effect')}
          <Select
            value={region}
            options={RegionOptions.map(evolve({ label: t }))}
            onChange={setRegion}
          />
        </Space>
      }
    >
      <Row gutter={[0, 12]}>
        <Col span={24} style={{ marginTop: -8 }}>
          <Radio.Group
            value={customForce.toString()}
            options={CustomOptions.map(evolve({ label: t }))}
            onChange={({ target: { value } }) =>
              setCustomForce(value === 'true')
            }
            optionType="button"
          />
        </Col>
        <Form.Item label={t('mob_force')} style={{ marginBottom: 0 }}>
          <InputNumber
            precision={0}
            min={0}
            step={10}
            value={mobForce}
            onChange={setMobForce}
          />
        </Form.Item>
        <Form.Item label={t('current_force')} style={{ marginBottom: 0 }}>
          <InputNumber
            precision={0}
            min={0}
            step={10}
            value={currentForce}
            onChange={setCurrentForce}
            disabled={!customForce}
          />
        </Form.Item>
        <Col span={24}>
          <Table
            dataSource={tableData}
            columns={columns.map(evolve({ title: t }))}
            pagination={false}
            scroll={{ x: '100%' }}
            size="small"
          />
        </Col>
      </Row>
    </Card>
  )
}

export default withTranslation()(ForceEffect)
