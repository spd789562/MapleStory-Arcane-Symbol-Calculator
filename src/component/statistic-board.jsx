import React from 'react'
import {
  Form,
  Select,
  Row,
  Col,
  Statistic,
  Card,
  InputNumber,
  Tooltip,
} from 'antd'
import { withTranslation } from '../i18n'

/* mapping */
import ArcZone from '../mapping/arcane-river-zone'
import ArcInfo from '../mapping/arcane-info'
import RoleMapping from '../mapping/role'

/* utils */
import symbolMatch from '../util/symbol-match'
import numberFormat from '../util/number-format'
import parserTableData from '../util/parser-table-data'
import moment from 'moment'

const useStatisticData = (data, t) => {
  const statisticData = ArcZone.map(({ name, key, daily, pquest }) => {
    const {
      count: currentCount,
      daily: dailySymbol = 0,
      quest: dailyQuest,
      party: dailyParty = 0,
    } = data[key]

    const dailyQuestCount = dailyQuest ? daily : 0
    // has party quest
    const dailyPartyQuestCount =
      dailyParty && pquest
        ? pquest.count ||
          // if not a static value then calculating
          (dailyParty + (pquest.basic || 0)) / (pquest.unit || 1)
        : 0
    const dailyTotalCount = dailySymbol + dailyQuestCount + dailyPartyQuestCount
    const { completeDate, remainDays } = parserTableData({
      key,
      level: 20,
      currentCount,
      dailyTotalCount,
    })
    return {
      name,
      level: symbolMatch(currentCount).level || 0,
      completeDate,
      remainDays,
    }
  })
    .filter((arcane) => arcane.level)
    .reduce(
      (acc, inc) => {
        if (moment(inc.completeDate).isValid()) {
          if (
            !acc.completeDate ||
            moment(inc.completeDate).isSameOrAfter(acc.completeDate, 'days')
          ) {
            acc.completeDate = inc.completeDate
            acc.latestName = inc.name
          }
        } else {
          acc.excludeName.push(inc.name)
        }
        // acc.completeDate = acc.completeDate
        //   ? moment(inc.completeDate).isValid() &&
        //     moment(inc.completeDate).isAfter(acc.completeDate, 'days')
        //     ? inc.completeDate
        //     : acc.completeDate
        //   : moment(inc.completeDate).isValid()
        //   ? inc.completeDate
        //   : undefined
        acc.total += inc.level
        acc.holded += inc.level !== 0 ? 1 : 0
        acc.remainDays =
          inc.remainDays !== Infinity && inc.remainDays > acc.remainDays
            ? inc.remainDays
            : acc.remainDays
        return acc
      },
      { total: 0, holded: 0, remainDays: 0, excludeName: [] }
    )
  const hyperStatPower = ArcInfo.hyper.formula(data.hyperStat || 0)
  const guildPower = ArcInfo.guild.formula(data.guildSkill || 0)
  const additionPower = hyperStatPower + guildPower
  const basicLevelUnit = statisticData.total + statisticData.holded * 2
  const currentArcanePower = basicLevelUnit * 10
  const avaliableArcanePower = statisticData.holded * 220
  const completeDateText = statisticData.total
    ? statisticData.remainDays === 0
      ? currentArcanePower === avaliableArcanePower
        ? t('complete_date_complete')
        : t('complete_date_never')
      : statisticData.completeDate
    : t('complete_date_none')
  const excludeTooltips =
    t('complete_date_tips_last', { area: t(statisticData.latestName) }) +
    (statisticData.excludeName.length
      ? t('comma') +
        t('complete_date_tips', {
          areas: statisticData.excludeName.map(t).join(', '),
        })
      : '')
  return {
    hyperStatPower,
    guildPower,
    currentArcanePower: currentArcanePower + additionPower,
    avaliableArcanePower: avaliableArcanePower + additionPower,
    statAmount: basicLevelUnit * (RoleMapping[data.role] || { unit: 100 }).unit,
    completeDateText,
    remainDays: statisticData.remainDays,
    excludeTooltips,
  }
}

const StatisticBoard = ({ data, t }) => {
  const {
    hyperStatPower,
    guildPower,
    currentArcanePower,
    avaliableArcanePower,
    statAmount,
    completeDateText,
    remainDays,
    excludeTooltips,
  } = useStatisticData(data, t)
  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Row>
            <Col span={12}>
              <Statistic
                title={t('arcane_power')}
                value={numberFormat(currentArcanePower)}
                suffix={`/ ${numberFormat(avaliableArcanePower)}`}
              />
            </Col>
            <Col span={12}>
              <Row gutter={[0, 8]} align="middle">
                <Col span={24}>
                  <Tooltip title={t('hyper_stat_tips')}>
                    <Form.Item name="hyperStat" noStyle>
                      <InputNumber
                        size="small"
                        placeholder={t('hyper_stat')}
                        min={0}
                        step={1}
                        max={ArcInfo.hyper.maxLevel}
                        precision={0}
                      />
                    </Form.Item>
                    &nbsp;/&nbsp;{hyperStatPower}
                  </Tooltip>
                </Col>
                <Col span={24}>
                  <Tooltip title={t('guild_skill_tips')}>
                    <Form.Item name="guildSkill" noStyle>
                      <InputNumber
                        size="small"
                        placeholder={t('guild_skill')}
                        min={0}
                        step={1}
                        max={ArcInfo.guild.maxLevel}
                        precision={0}
                      />
                    </Form.Item>
                    &nbsp;/&nbsp;{guildPower}
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Row>
            <Col span={12}>
              <Statistic title={t('stat_increase')} value={statAmount} />
            </Col>
            <Col span={12}>
              <Form.Item name="role" noStyle>
                <Select>
                  {RoleMapping.map(({ name }, index) => (
                    <Select.Option value={index} key={`role-${index}`}>
                      {t(name)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} lg={8}>
        <Card>
          <Statistic
            title={
              <Tooltip title={remainDays ? excludeTooltips : completeDateText}>
                {t('all_complete_date')}
              </Tooltip>
            }
            value={completeDateText}
            suffix={
              remainDays
                ? `(${numberFormat(remainDays)}${t('complete_days')})`
                : ''
            }
          />
        </Card>
      </Col>
    </Row>
  )
}

export default withTranslation('index')(StatisticBoard)
