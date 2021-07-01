import React from 'react'

import { Form, InputNumber, Avatar } from 'antd'

import { withTranslation } from '../../i18n'

const SelectableInput = ({ t, region, regionKey: key }) => (
  <Form.Item
    name={[key, 'extra']}
    label={
      <Avatar
        src={`/${region === 'arcane' ? 'arc':'aut'}-selectable.png`}
        alt={t('alt_extra')}
        style={{ cursor: 'pointer' }}
      />
    }
    style={{
      display: 'inline-flex',
      marginBottom: 0,
    }}
  >
    <InputNumber min={0} defaultValue={0} precision={0} />
  </Form.Item>
)

export default withTranslation('index')(SelectableInput)
