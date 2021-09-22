import React from 'react'

import { Form, Slider, Switch, Avatar, Tooltip } from 'antd'

import { withTranslation } from '@i18n'

const DailyQuest = ({ t, regionKey: key, name, daily, extraRegion }) => (
  <Tooltip
    title={`${t('daily_quest_tips', { count: daily[0] || daily })}${
      extraRegion
        ? t('daily_quest_tips_extra', {
            region: t(extraRegion),
            count: daily[0],
          })
        : ''
    }`}
  >
    <Form.Item
      name={[key, 'quest']}
      label={
        <Avatar
          shape="square"
          src="/daily.png"
          alt={t('alt_daily', { name: t(name) })}
          style={{ cursor: 'pointer' }}
        />
      }
      style={{
        display: 'flex',
        marginBottom: 0,
        paddingRight: 8,
      }}
      valuePropName={extraRegion ? 'value' : 'checked'}
    >
      {extraRegion ? (
        <Slider
          step={1}
          marks={{
            0: 0,
            1: daily[0],
            2: daily[1],
          }}
          min={0}
          max={daily.length}
          tooltipVisible={false}
          style={{
            marginTop: extraRegion ? -2 : 0,
          }}
        />
      ) : (
        <Switch checkedChildren={daily} unCheckedChildren="0" />
      )}
    </Form.Item>
  </Tooltip>
)

export default withTranslation('index')(DailyQuest)
