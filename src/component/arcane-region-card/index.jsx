import React from 'react'
import {
  Form,
  Row,
  Col,
  Card,
  Tooltip,
} from 'antd'

/* component */
import ArcaneInputRangeSync from './arcane-input-range-sync'
import SelectableInput from './selectable-input'
import SelectablePreview from './selectable-preview'
import SelectableApply from './selectable-apply'
import DailyQuest from './daily-quest'
import PartyQuest from './party-quest'

/* mapping */
import ArcZone from '../../mapping/arcane-river-zone'

/* helper */
import { withTranslation } from '../../i18n'

const ArcaneRegionCard = ({ t, regionIndex }) => {
  const { name, extraRegion, key, daily, pquest } = ArcZone[regionIndex]
  return (
    <Card title={t(name)}>
      <Row gutter={[0, 12]}>
        <Col span={24}>
          <Form.Item name={[key, 'count']} style={{ marginBottom: 0 }}>
            <ArcaneInputRangeSync name={key} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Row>
            <Col flex="none">
              <Tooltip
                title={t('extra_symbol')}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <SelectableInput regionKey={key} />
                <SelectablePreview regionKey={key} />
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
          <Tooltip
            title={
              t('daily_quest_tips', { count: daily[0] || daily }) +
              (extraRegion
                ? t('daily_quest_tips_extra', {
                    region: t(extraRegion),
                    count: daily[0],
                  })
                : '')
            }
          >
            <DailyQuest
              {...{
                regionKey: key,
                name,
                daily,
                extraRegion,
              }}
            />
          </Tooltip>
        </Col>
        {pquest && (
          <Col span={12}>
            <Tooltip
              title={
                pquest.desc
                  ? t(pquest.desc, {
                      ...pquest,
                      name: t(pquest.name),
                    })
                  : t('party_quest_tips', {
                      name: t(pquest.name),
                      count: pquest.count || pquest.dailyMax,
                    }) +
                    (pquest.unit ? t('party_quest_tips_exchange', pquest) : '')
              }
            >
              <PartyQuest regionKey={key} pquest={pquest} />
            </Tooltip>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default withTranslation()(ArcaneRegionCard)
