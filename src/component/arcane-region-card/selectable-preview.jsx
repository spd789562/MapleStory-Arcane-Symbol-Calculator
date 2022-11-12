import React from 'react'

import { Form } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

import fieldShouldUpdate from '../../util/antd-field-should-update'
import arcMatching from '../../util/arc-match'
import { composeP } from 'ramda'

const SelectablePreview = ({ regionKey: key, region }) => (
  <Form.Item
    shouldUpdate={fieldShouldUpdate([
      [key, 'count'],
      [key, 'extra'],
    ])}
    noStyle
  >
    {({ getFieldValue }) => {
      const areaData = getFieldValue(key) || {}
      const total = areaData.count + (areaData.extra || 0)
      const regionData = {
        region,
        zone: key,
      }
      return areaData.extra ? (
        <span
          style={{
            display: 'inline-block',
            paddingTop: 4,
          }}
        >
          <ArrowRightOutlined style={{ margin: '0 4px' }} />
          {`Lv.${arcMatching(regionData, total).level} / ` +
            `${total - arcMatching(regionData, total).stack}`}
        </span>
      ) : null
    }}
  </Form.Item>
)

export default SelectablePreview
