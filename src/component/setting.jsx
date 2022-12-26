import { withTranslation } from '@i18n'

import { Card, Form, Select, Switch } from 'antd'

import { times } from 'ramda'

const Setting = ({ t }) => {
  return (
    <Card style={{ marginBottom: 8 }}>
      <Form.Item name="resetDay" label="重製時間" valuePropName="value">
        <Select>
          {times(
            (index) => (
              <Select.Option value={index + 1} key={`day-${index}`}>
                {index + 1}
              </Select.Option>
            ),
            7
          )}
        </Select>
      </Form.Item>
      <Form.Item
        name="currentWeekIsDone"
        label="本周任務是否完成"
        valuePropName="checked"
      >
        <Switch checkedChildren="yes" unCheckedChildren="no" />
      </Form.Item>
    </Card>
  )
}

export default withTranslation('index')(Setting)
