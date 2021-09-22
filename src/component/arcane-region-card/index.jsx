import React from 'react'
import { Form, Row, Col, Card, Tooltip } from 'antd'

/* component */
import ArcaneInputRangeSync from './arcane-input-range-sync'
import SelectableInput from './selectable-input'
import SelectablePreview from './selectable-preview'
import SelectableApply from './selectable-apply'
import DailyQuest from './daily-quest'
import PartyQuest from './party-quest'

/* mapping */
import SymbolRegion from '../../mapping/region'

/* helper */
import { withTranslation } from '@i18n'

const ArcaneRegionCard = ({ t, region, regionIndex }) => {
  const { name, extraRegion, key, daily, pquest } =
    SymbolRegion[region][regionIndex]
  return (
    <Card title={t(name)}>
      <Row gutter={[0, 12]}>
        <Col span={24}>
          <Form.Item name={[key, 'count']} style={{ marginBottom: 0 }}>
            <ArcaneInputRangeSync region={region} zone={key} name={key} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Row>
            <Col flex="none">
              <Tooltip
                title={t('extra_symbol')}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <SelectableInput region={region} regionKey={key} />
                <SelectablePreview region={region} regionKey={key} />
              </Tooltip>
            </Col>
            <Col xs={24} sm={5} style={{ marginLeft: 'auto' }}>
              <SelectableApply regionKey={key} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <h4>{t('daily_symbol_source')}:</h4>
        </Col>
        <Col span={12}>
          <DailyQuest
            {...{
              regionKey: key,
              name,
              daily,
              extraRegion,
            }}
          />
        </Col>
        {pquest && (
          <Col span={12}>
            <PartyQuest regionKey={key} pquest={pquest} />
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default withTranslation()(ArcaneRegionCard)
