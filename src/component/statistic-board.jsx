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
import { withTranslation } from '@i18n'

/* mapping */
import SymbolRegion from '../mapping/region'
import ArcInfo from '../mapping/arcane-info'
import SymbolInfo from '../mapping/force'
import RoleMapping from '../mapping/role'

/* utils */
import symbolMatch from '../util/symbol-match'
import numberFormat from '../util/number-format'
import parserTableData from '../util/parser-table-data'
import moment from 'moment'

const useStatisticData = (data, t) => {
  const statisticData = SymbolRegion[data.region]
    .map(({ name, key, daily, pquest }) => {
      const {
        count: currentCount,
        daily: dailySymbol = 0,
        quest: dailyQuest,
        party: dailyParty = 0,
      } = data[key] || {}

      const dailyQuestCount = dailyQuest ? daily[dailyQuest - 1] || daily : 0
      // has party quest
      const dailyPartyQuestCount =
        dailyParty && pquest
          ? pquest.count ||
            // if not a static value then calculating
            (dailyParty + (pquest.basic || 0)) / (pquest.unit || 1)
          : 0
      const dailyTotalCount =
        dailySymbol + dailyQuestCount + dailyPartyQuestCount
      const { completeDate, remainDays } = parserTableData({
        region: data.region,
        key,
        zone: key,
        level: SymbolInfo[data.region].symbol.maxLevel,
        currentCount,
        dailyTotalCount,
      })
      return {
        name,
        level:
          symbolMatch({ region: data.region, zone: key }, currentCount).level ||
          0,
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
  const currentSymbolInfo = SymbolInfo[data.region]
  const hyperStatPower =
    currentSymbolInfo.hyper?.formula(data.hyperStat || 0) || 0
  const guildPower = currentSymbolInfo.guild?.formula(data.guildSkill || 0) || 0
  const additionPower = hyperStatPower + guildPower

  const stateUnit =
    (RoleMapping[data.role] || { unit: 100 }).unit *
    (currentSymbolInfo.symbol.stateMultiple || 1)
  const stateBasic = currentSymbolInfo.symbol.getStateBasic(stateUnit)
  const statAmount =
    statisticData.total * stateUnit + statisticData.holded * stateBasic
  const currentArcanePower =
    statisticData.total * currentSymbolInfo.symbol.forceUnit +
    statisticData.holded * currentSymbolInfo.symbol.forceBasic
  const symbolMaxPower =
    currentSymbolInfo.symbol.maxLevel * currentSymbolInfo.symbol.forceUnit +
    currentSymbolInfo.symbol.forceBasic
  const avaliableArcanePower = statisticData.holded * symbolMaxPower

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
    statAmount,
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
  const currentSymbolInfo = SymbolInfo[data.region]
  const forceText =
    data.region === 'arcane' ? 'arcane_force' : 'authentic_force'
  return (
    <Row gutter={[8, 8]} style={{ padding: '8px 0' }}>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Row>
            <Col span={12}>
              <Statistic
                title={t(forceText)}
                value={numberFormat(currentArcanePower)}
                suffix={`/ ${numberFormat(avaliableArcanePower)}`}
              />
            </Col>
            <Col span={12}>
              <Row gutter={[0, 8]} align="middle">
                <Col
                  span={24}
                  style={{
                    display: currentSymbolInfo.hyper ? 'block' : 'none',
                  }}
                >
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
                <Col
                  span={24}
                  style={{
                    display: currentSymbolInfo.guild ? 'block' : 'none',
                  }}
                >
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
