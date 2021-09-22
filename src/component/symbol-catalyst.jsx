import React, { useEffect, useState } from 'react'
import { Space, Row, Col, Card, Tooltip, Select, Switch } from 'antd'

/* component */
import ArcaneInputRangeSync from './arcane-region-card/arcane-input-range-sync'
import { ForwardOutlined } from '@ant-design/icons'
/* mapping */
import SymbolRegion from '../mapping/region'

/* helper */
import { withTranslation } from '@i18n'
import { prop, evolve, identity } from 'ramda'
import getSymbolMesosTotal from '../util/get-symbol-mesos-total'

/* currently only has arcane catalyst */
const defaultZone = 'arcane'

const RegionData = SymbolRegion[defaultZone]
const options = [
  ...RegionData.map(({ name, key }) => ({ label: name, value: key })),
  {
    label: 'option_custom',
    value: 'custom',
  },
]

const SymbolCatalyst = ({ t, getFieldValue }) => {
  const [value, setCurrentStack] = useState(0)
  const [zone, setZone] = useState('custom')
  const [isDiscount, setDiscount] = useState(false)
  useEffect(() => {
    let _count = 0
    if (zone !== 'custom') {
      _count = getFieldValue(zone).count
    }
    setCurrentStack(_count)
  }, [zone])
  const _zone =
    zone !== 'custom' ? zone : isDiscount ? options[0].value : options[1].value
  const afterSatalystValue = Math.floor(value * 0.8)
  return (
    <Card
      title={
        <Space>
          <img
            src="/symbol-catalyst.png"
            alt={t('symbol_catalyst')}
            style={{ width: 20 }}
          />
          {t('symbol_catalyst')}
          <Select
            options={options.map(evolve({ label: t }))}
            value={zone}
            onChange={setZone}
            dropdownMatchSelectWidth={false}
          />
        </Space>
      }
    >
      <Row gutter={[0, 12]}>
        <Col span={24}>
          <ArcaneInputRangeSync
            region={defaultZone}
            zone={_zone}
            name={_zone}
            value={value}
            onChange={(value) => {
              setCurrentStack(value.target ? value.target.value : value)
            }}
            defaultAvatar={zone === 'custom'}
            disabled={zone !== 'custom'}
          />
        </Col>
        <Col span={24} style={{ marginTop: -20 }}>
          <Row align="middle">
            <div style={{ display: 'inline-block' }}>
              {zone === 'custom' && (
                <div>
                  {t('symbol_discount')}:{' '}
                  <Switch value={isDiscount} onChange={setDiscount} />
                </div>
              )}
              <div>
                {t('catalyst_upgrade_cost')}:{' '}
                {getSymbolMesosTotal({
                  region: defaultZone,
                  zone: _zone,
                  count: afterSatalystValue,
                })}
              </div>
            </div>
            <ForwardOutlined
              rotate={90}
              style={{ color: '#6373ca', fontSize: 24, marginLeft: 12 }}
            />
          </Row>
        </Col>
        <Col span={24}>
          <ArcaneInputRangeSync
            region={defaultZone}
            zone={_zone}
            name={_zone}
            value={afterSatalystValue}
            onChange={identity}
            defaultAvatar={zone === 'custom'}
            disabled
          />
        </Col>
      </Row>
    </Card>
  )
}

export default withTranslation()(SymbolCatalyst)
