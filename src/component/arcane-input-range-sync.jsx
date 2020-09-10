import React, { Fragment } from 'react'

import { Form, Input, InputNumber, Slider } from 'antd'

import ArcMapping from '../mapping/arcane'

const arcMatching = (arcane) =>
  Object.values(ArcMapping).find(
    // get match range of arcane
    (arc, index, arr) =>
      arcane >= arc.stack &&
      arcane < (arr[index + 1] ? arr[index + 1].stack : arc.stack + 1)
  ) || { level: 0, stack: 0, count: 0 }

const Level = ({ value: arcane, onChange }) => {
  const currentArcane = arcMatching(arcane)
  return (
    <InputNumber
      precision={0}
      min={0}
      max={20}
      step={arcMatching.count}
      value={currentArcane.level}
      style={{ width: 70 }}
      onChange={(value) => {
        onChange(
          value ? arcane - currentArcane.stack + ArcMapping[value].stack : 0
        )
      }}
      defaultValue={0}
    />
  )
}

const Exp = ({ value: arcane, onChange }) => {
  const currentArcane = arcMatching(arcane)
  return (
    <InputNumber
      precision={0}
      min={0}
      max={currentArcane.count + currentArcane.stack}
      formatter={(value) =>
        value - currentArcane.stack + !!(currentArcane.level === 1)
      }
      parser={(value) => +value + currentArcane.stack}
      value={arcane}
      style={{ width: 70 }}
      onChange={onChange}
      defaultValue={0}
    />
  )
}

const ArcaneInputRangeSync = ({ label, name, value = 0, onChange }) => (
  <Fragment>
    <Form.Item
      label="當前等級"
      labelCol={{ xs: 6, sm: 8 }}
      wrapperCol={{ xs: 18, sm: 16 }}
      style={{ marginBottom: 0 }}
    >
      <Input.Group compact>
        <Form.Item noStyle>
          <Level value={value} onChange={onChange}></Level>
        </Form.Item>
        <Form.Item noStyle>
          <Exp value={value} onChange={onChange}></Exp>
        </Form.Item>
      </Input.Group>
    </Form.Item>
    {/* <Form.Item name={name}>
      <Slider
        max={2679}
        value={value}
        tipFormatter={(value) =>
          `Lv.${arcMatching(value).level} / ` +
          `${value - arcMatching(value).stack}`
        }
      />
    </Form.Item> */}
  </Fragment>
)

export default ArcaneInputRangeSync
