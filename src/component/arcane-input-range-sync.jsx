import React, { Fragment } from 'react'

import { Form, Input, InputNumber, Slider, Avatar, Tooltip } from 'antd'

import { withTranslation } from '../i18n'

import arcMatching from '../util/arc-match'
import {pipe, indexBy, map, prop} from 'ramda'

import ArcMapping from '../mapping/arcane'

const Level = ({ value: arcane, onChange }) => {
  const currentArcane = arcMatching(arcane)
  return (
    <InputNumber
      precision={0}
      min={0}
      max={20}
      step={arcMatching.count}
      value={currentArcane.level}
      style={{ width: 60 }}
      onChange={(value) => {
        onChange(
          value ? arcane - currentArcane.stack + ArcMapping[value].stack : 0
        )
      }}
      placeholder="Lv."
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
      placeholder="Exp"
      defaultValue={0}
    />
  )
}

const ArcaneInputRangeSync = ({ name, value = 0, onChange, t }) => (
  <Fragment>
    <Tooltip title={t('symbol_level_tips')}>
      <Form.Item
        label={
          <Avatar
            src={`/arcane-symbol-${name}.png`}
            alt={t('alt_symbol', { name: t(name) })}
            style={{ cursor: 'pointer' }}
          />
        }
        style={{ display: 'inline-flex', marginBottom: 0 }}
      >
        <Input.Group>
          <Form.Item noStyle>
            <Level value={value} onChange={onChange}></Level>
          </Form.Item>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <Form.Item noStyle>
            <Exp value={value} onChange={onChange}></Exp>
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </Tooltip>
    <Slider
      max={2679}
      value={value}
      tipFormatter={(value) =>
        `Lv.${arcMatching(value).level} / ` +
        `${value - arcMatching(value).stack}`
      }
      onChange={onChange}
      marks={pipe(indexBy(prop('stack')), map(() => ''))(ArcMapping)}
    />
  </Fragment>
)

export default withTranslation('index')(ArcaneInputRangeSync)
