import React from 'react'

import { Form } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

import fieldShouldUpdate from '../../util/antd-field-should-update'
import arcMatching from '../../util/arc-match'

const SelectablePreview = ({ regionKey: key }) => (
  <Form.Item
    shouldUpdate={fieldShouldUpdate([
      [key, 'count'],
      [key, 'extra'],
    ])}
    noStyle
  >
    {({ getFieldValue }) => {
      const areaData = getFieldValue(key)
      const total = areaData.count + (areaData.extra || 0)
      return areaData.extra ? (
        <span
          style={{
            display: 'inline-block',
            paddingTop: 4,
          }}
        >
          <ArrowRightOutlined style={{ margin: '0 4px' }} />
          {`Lv.${arcMatching(total).level} / ` +
            `${total - arcMatching(total).stack}`}
        </span>
      ) : null
    }}
  </Form.Item>
)

export default SelectablePreview
