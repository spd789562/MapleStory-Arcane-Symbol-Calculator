import React from 'react'
import { Form, Select, Row, Col, Statistic, Card } from 'antd'

/* mapping */
import ArcZone from '../mapping/arcane-river-zone'
import RoleMapping from '../mapping/role'

/* utils */
import symbolMatch from '../util/symbol-match'
import numberFormat from '../util/number-format'
import parserTableData from '../util/parser-table-data'
import moment from 'moment'

const useStatisticData = (data) => {
  const statisticData = ArcZone.map(({ key, daily, pquest }) => {
    const {
      count: currentCount,
      daily: dailySymbol = 0,
      quest: dailyQuest,
      party: dailyParty = 0,
    } = data[key]
    const dailyTotalCount =
      dailySymbol +
      (dailyQuest ? daily : 0) +
      (dailyParty && pquest
        ? pquest.count ||
          (dailyParty + (pquest.basic || 0)) / (pquest.unit || 1)
        : 0)
    const { completeDate, remainDays } = parserTableData({
      key,
      level: 20,
      currentCount,
      dailyTotalCount,
    })
    return {
      level: symbolMatch(currentCount).level || 0,
      completeDate,
      remainDays,
    }
  }).reduce(
    (acc, inc) => {
      acc.completeDate = acc.completeDate
        ? moment(inc.completeDate).isValid() &&
          moment(inc.completeDate).isAfter(acc.completeDate, 'days')
          ? inc.completeDate
          : acc.completeDate
        : moment(inc.completeDate).isValid()
        ? inc.completeDate
        : undefined
      acc.total += inc.level
      acc.holded += inc.level !== 0 ? 1 : 0
      acc.remainDays =
        inc.remainDays !== Infinity && inc.remainDays > acc.remainDays
          ? inc.remainDays
          : acc.remainDays
      return acc
    },
    { total: 0, holded: 0, remainDays: 0 }
  )

  const basicLevelUnit = statisticData.total + statisticData.holded * 2
  const currentArcanePower = basicLevelUnit * 10
  const avaliableArcanePower = statisticData.holded * 220
  return {
    currentArcanePower,
    avaliableArcanePower,
    statAmount: basicLevelUnit * (RoleMapping[data.role] || { unit: 100 }).unit,
    completeDateText: statisticData.total
      ? statisticData.remainDays === 0
        ? currentArcanePower === avaliableArcanePower
          ? '已達成當前上限'
          : '永遠完成不了'
        : statisticData.completeDate
      : '無',
    remainDays: statisticData.remainDays,
  }
}

const StatisticBoard = ({ data }) => {
  const {
    currentArcanePower,
    avaliableArcanePower,
    statAmount,
    completeDateText,
    remainDays,
  } = useStatisticData(data)
  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Arc"
            value={numberFormat(currentArcanePower)}
            suffix={`/ ${numberFormat(avaliableArcanePower)}`}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Row>
            <Col span={12}>
              <Statistic title="屬性加成量" value={statAmount} />
            </Col>
            <Col span={12}>
              <Form.Item name="role" noStyle>
                <Select>
                  {RoleMapping.map(({ name }, index) => (
                    <Select.Option value={index} key={`role-${index}`}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12}>
        <Card>
          <Statistic
            title="完成日期(天數)"
            value={completeDateText}
            suffix={remainDays ? `(${numberFormat(remainDays)}天)` : ''}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default StatisticBoard
