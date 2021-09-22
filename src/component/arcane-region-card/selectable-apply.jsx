import React from 'react'

import { Form, Button } from 'antd'

import { withTranslation } from '@i18n'

import fieldShouldUpdate from '../../util/antd-field-should-update'

const SelectableApply = ({ t, regionKey: key }) => (
  <Form.Item
    shouldUpdate={fieldShouldUpdate([
      [key, 'count'],
      [key, 'extra'],
    ])}
    noStyle
  >
    {({ getFieldValue, setFieldsValue }) => {
      const areaData = getFieldValue(key)
      const total = areaData.count + (areaData.extra || 0)
      return (
        <Button
          type="primary"
          block
          onClick={() => {
            setFieldsValue({
              [key]: {
                ...areaData,
                count: total,
                extra: 0,
              },
            })
          }}
          disabled={!areaData.extra}
        >
          {t('extra_symbol_add')}
        </Button>
      )
    }}
  </Form.Item>
)

export default withTranslation('index')(SelectableApply)
