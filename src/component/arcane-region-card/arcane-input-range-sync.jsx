import React, { Fragment } from 'react'

import { Form, Input, InputNumber, Slider, Avatar, Tooltip } from 'antd'

import { withTranslation } from '@i18n'

import arcMatching from '../../util/arc-match'
import { pipe, indexBy, map, prop } from 'ramda'

import SymbolInfo from '../../mapping/force'
import SymbolMapping from '../../mapping/symbol'

export const Level = ({ value: arcane, onChange, region, disabled }) => {
  const currentArcane = arcMatching(region, arcane)
  const CurrentSymbolMapping = SymbolMapping[region.region]
  return (
    <InputNumber
      precision={0}
      min={0}
      max={20}
      value={currentArcane.level}
      style={{ width: 60 }}
      onChange={(value) => {
        onChange(
          value
            ? arcane - currentArcane.stack + CurrentSymbolMapping[value].stack
            : 0
        )
      }}
      placeholder="Lv."
      defaultValue={0}
      disabled={disabled}
    />
  )
}

export const Exp = ({ value: arcane, onChange, region, disabled }) => {
  const currentArcane = arcMatching(region, arcane)
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
      disabled={disabled}
    />
  )
}

const ArcaneInputRangeSync = ({
  name,
  region,
  zone,
  value = 0,
  onChange,
  t,
  disabled = false,
  defaultAvatar,
}) => {
  const regionData = { region, zone }
  const CurrentSymbolMapping = SymbolMapping[region]
  return (
    <Fragment>
      <Tooltip title={t('symbol_level_tips')}>
        <Form.Item
          label={
            <Avatar
              src={`/${region}-symbol-${defaultAvatar ? 'default' : name}.png`}
              alt={t('alt_symbol', { name: t(name) })}
              style={{ cursor: 'pointer' }}
            />
          }
          style={{ display: 'inline-flex', marginBottom: 0 }}
        >
          <Input.Group>
            <Form.Item noStyle>
              <Level
                value={value}
                onChange={onChange}
                region={regionData}
                disabled={disabled}
              />
            </Form.Item>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <Form.Item noStyle>
              <Exp
                value={value}
                onChange={onChange}
                region={regionData}
                disabled={disabled}
              />
            </Form.Item>
            <Form.Item noStyle>
              <span style={{ fontSize: 12, color: '#dedede' }}>
                &nbsp;&nbsp; ( {value} / {SymbolInfo[region].symbol.maxExp} )
              </span>
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </Tooltip>
      <Slider
        max={SymbolInfo[region].symbol.maxExp}
        value={value}
        tipFormatter={(value) =>
          `Lv.${arcMatching(regionData, value).level} / ` +
          `${value - arcMatching(regionData, value).stack}`
        }
        onChange={onChange}
        marks={pipe(
          indexBy(prop('stack')),
          map(() => '')
        )(CurrentSymbolMapping)}
        disabled={disabled}
      />
    </Fragment>
  )
}

export default withTranslation('index')(ArcaneInputRangeSync)
