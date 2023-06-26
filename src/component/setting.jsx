import { withTranslation } from '@i18n'

import { Card, Col, Form, Row, Select, Switch, Tooltip } from 'antd'

import { times } from 'ramda'

const Setting = ({ t }) => {
  return (
    <Card style={{ marginBottom: 8 }}>
      <Row gutter={[8, 0]}>
        <Col span={24} sm={8} md={4}>
          <Tooltip title={t('setting_reset_day_tips')}>
            <Form.Item
              name="resetDay"
              label={t('setting_reset_day_title')}
              valuePropName="value"
            >
              <Select>
                {times(
                  (index) => (
                    <Select.Option value={index + 1} key={`day-${index}`}>
                      {t(`setting_day_${index + 1}`)}
                    </Select.Option>
                  ),
                  7
                )}
              </Select>
            </Form.Item>
          </Tooltip>
        </Col>
        <Col span={24} sm={12} md={8}>
          <Tooltip title={t('setting_weeklyIsDone_tips')}>
            <Form.Item
              name="currentWeekIsDone"
              label={t('setting_weeklyIsDone_title')}
              valuePropName="checked"
            >
              <Switch
                checkedChildren={t('setting_yes')}
                unCheckedChildren={t('setting_no')}
              />
            </Form.Item>
          </Tooltip>
        </Col>
      </Row>
    </Card>
  )
}

export default withTranslation('index')(Setting)
