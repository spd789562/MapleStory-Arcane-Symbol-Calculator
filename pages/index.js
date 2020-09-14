import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import {
  Layout,
  Form,
  Input,
  Radio,
  InputNumber,
  Row,
  Col,
  Table,
  BackTop,
  Statistic,
  Card,
  Avatar,
  Space,
  Tooltip,
  Switch,
} from 'antd'
import ArcaneInputRangeSync from '../src/component/arcane-input-range-sync'
// import { Line } from '@ant-design/charts'

import ArcMapping from '../src/mapping/arcane'
import ArcInfo from '../src/mapping/arcane-info'

import styles from '../styles/Home.module.css'

import moment from 'moment'

const { Header, Content, Footer } = Layout

const Line = dynamic(() => import('@ant-design/charts/es/line'), {
  ssr: false,
})
// Vanishing Journey
// ChuChu
// Lachelein
// Arcana
// Morass
// Esfera

const arcaneLocals = [
  {
    name: '消逝的旅途',
    daily: 8,
    pquest: { name: '艾爾達斯光譜', count: 6 },
    key: 'vanishingjourney',
  },
  {
    name: '啾啾愛爾蘭',
    daily: 4,
    pquest: { name: '肚子餓的武藤', dailyMax: 15 },
    key: 'chuchu',
  },
  {
    name: '拉契爾恩',
    key: 'lachelein',
    daily: 4,
    coin: {
      name: '毀夢者',
      unit: 30,
      basic: 24,
      dailyMax: 500,
      desc: `毀夢者: 最多可獲得 ${500} 個, ${30} 個可兌換 1 個符文, 已自動計入雕像對話保底 24 個`,
    },
  },
  {
    name: '阿爾卡納',
    key: 'arcana',
    daily: 8,
    coin: { name: '精靈救援者', unit: 3, basic: 0, dailyMax: 30 },
  },
  { name: '魔菈斯', daily: 8, key: 'morass' },
  { name: '艾斯佩拉', daily: 8, key: 'esfera' },
]

const arcMatching = (arcane) =>
  Object.values(ArcMapping).find(
    // get match range of arcane
    (arc, index, arr) =>
      arcane >= arc.stack &&
      arcane < (arr[index + 1] ? arr[index + 1].stack : arc.stack + 1)
  ) || { level: 0, stack: 0, count: 0 }

const cashFormat = (number) => `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const toRowData = ({ key, level, currentCount, dailyTotalCount }) => {
  const TargetArcane = ArcMapping[level]
  const currentArcane = arcMatching(currentCount)
  const remainDays = Math.ceil(
    (TargetArcane.stack - currentCount) / dailyTotalCount
  )
  const totalCost = Object.values(ArcMapping).reduce(
    (totalCost, { level: arcaneLevel, cost }) => {
      totalCost +=
        arcaneLevel >= currentArcane.level && arcaneLevel <= level - 1
          ? +cost
          : 0
      return totalCost
    },
    0
  )
  const completeDate = moment().add(remainDays, 'days').format('YYYY-MM-DD')
  return {
    key,
    level,
    completeDate,
    currentLevel: currentArcane.level,
    remainDays,
    completeDateText:
      moment().add(remainDays, 'days').format('YYYY-MM-DD') +
      `(${cashFormat(remainDays)}天)`,
    accumulativeNeed: TargetArcane.stack - currentCount,
    totalCost: cashFormat(totalCost),
  }
}

const renderIfMaxLevel = (text, row) =>
  row.currentLevel === ArcInfo.maxLevel ||
  row.currentLevel === 0 ||
  row.dailyTotalCount === 0
    ? {
        children:
          row.currentLevel === ArcInfo.maxLevel
            ? '已滿級'
            : row.currentLevel === 0
            ? '未獲得此符文'
            : `你每天都不拿，就卡在 ${row.currentLevel} 等吧`,
        props: {
          colSpan: 4,
        },
      }
    : text
const renderEmptyIfMaxLevel = (text, row) =>
  row.currentLevel === ArcInfo.maxLevel ||
  row.currentLevel === 0 ||
  row.dailyTotalCount === 0
    ? {
        children: text,
        props: {
          colSpan: 0,
        },
      }
    : typeof text === 'number'
    ? cashFormat(text)
    : text

const ResultTable = ({ getFieldValue }) => {
  const FinialData = arcaneLocals.map(({ name, key, coin, daily }) => {
    const {
      count: currentCount,
      daily: dailySymbol = 0,
      coin: dailyCoin = 0,
      quest: dailyQuest = 0,
    } = getFieldValue(key)
    const dailyTotalCount =
      dailySymbol +
      (coin ? dailyCoin / coin.unit : 0) +
      (dailyQuest ? daily : 0)
    const subTableData =
      +!!dailyTotalCount !== 0 && +!!currentCount !== 0
        ? Object.values(ArcMapping)
            .filter(({ stack }) => {
              return currentCount < stack
            })
            .map(({ level }) =>
              toRowData({
                key: `${key}-${level}`,
                level,
                currentCount,
                dailyTotalCount,
              })
            )
        : []
    return {
      ...toRowData({
        key,
        level: 20,
        currentCount,
        dailyTotalCount,
      }),
      dailyTotalCount,
      currentCount,
      name,
      coin,
      ...(subTableData.length ? { children: subTableData } : {}),
    }
  })
  const today = moment().format('YYYY-MM-DD')

  const chartData = Object.values(
    FinialData.filter(({ currentLevel }) => currentLevel).reduce(
      (acc, inc) => {
        acc.data.push({
          date: today,
          type: inc.key,
          value: (inc.currentLevel + 2) * 10,
        })
        acc.total[today] = (acc.total[today] || 0) + (inc.currentLevel + 2) * 10
        if (inc.children) {
          inc.children.forEach(({ completeDate }) => {
            acc.data.push({
              date: completeDate,
              type: inc.key,
              value: 10,
            })
            acc.total[completeDate] = (acc.total[completeDate] || 0) + 10
          })
        }
        return acc
      },
      { data: [], total: {} }
    )
  )
    .reduce(
      (acc, inc) =>
        Array.isArray(inc)
          ? [...inc, ...acc]
          : [
              ...Object.entries(inc).map(([date, value]) => ({
                date,
                type: '總和',
                value,
              })),
              ...acc,
            ],
      []
    )
    .sort((a, b) => moment(a.date).unix() - moment(b.date).unix())
    .reduce(
      (acc, inc) => {
        if (!acc.data[inc.date]) acc.data[inc.date] = { ...acc.stack }
        acc.stack[inc.type] = (acc.stack[inc.type] || 0) + inc.value
        acc.data[inc.date][inc.type] = acc.stack[inc.type]
        return acc
      },
      { data: {}, stack: {} }
    ).data
  const testData = Object.entries(chartData)
    .map(([date, data]) =>
      Object.entries(data).map(([type, value]) => ({
        type,
        value,
        date,
      }))
    )
    .reduce((acc, inc) => acc.concat(inc), [])
  // .reduce((acc, inc, index, arr) => {
  //   if (!acc.data) {
  //     acc.data = arr
  //     acc.stack = {}
  //   }
  //   if (!acc.stack[inc.type]) {
  //     acc.stack[inc.type] = inc.value
  //   } else {
  //     acc.stack[inc.type] += inc.value
  //     acc.data[index].value = acc.stack[inc.type]
  //   }
  //   return acc
  // }, {})
  return (
    <Fragment>
      <Table
        columns={[
          {
            title: '地區',
            dataIndex: 'name',
            key: 'name',
            width: 120,
            align: 'center',
          },
          {
            title: '等級',
            dataIndex: 'level',
            key: 'level',
            align: 'center',
            width: 60,
            render: renderIfMaxLevel,
          },
          {
            title: '達成日期(天數)',
            dataIndex: 'completeDateText',
            key: 'completeDateText',
            align: 'center',
            width: 190,
            render: renderEmptyIfMaxLevel,
          },
          {
            title: '累計符文',
            dataIndex: 'accumulativeNeed',
            key: 'accumulativeNeed',
            align: 'center',
            width: 100,
            render: renderEmptyIfMaxLevel,
          },
          {
            title: '累計楓幣',
            dataIndex: 'totalCost',
            key: 'totalCost',
            align: 'center',
            width: 120,
            render: renderEmptyIfMaxLevel,
          },
        ]}
        dataSource={FinialData}
        pagination={false}
        scroll={{ x: '100%' }}
        sticky
      ></Table>
      {/* <Line
        {...{
          title: {
            visible: true,
            text: 'arc 趨勢圖',
          },
          forceFit: true,
          data: testData,
          padding: 'auto',
          xField: 'date',
          yField: 'value',
          seriesField: 'type',
          xAxis: {
            type: 'dateTime',
          },
          legend: { position: 'right-top' },
        }}
      ></Line> */}
    </Fragment>
  )
}

export default function Home() {
  const [form] = Form.useForm()
  return (
    <Layout className="layout">
      <Head>
        <title>秘法符文計算機</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Header className={styles.header}>
        <div className={styles['header-container']}>
          <h2>秘法符文計算機</h2>
        </div>
      </Header>
      <BackTop />
      <Content className={styles.content}>
        <Form
          form={form}
          initialValues={{
            vanishingjourney: {},
            chuchu: {},
            lachelein: {},
            arcana: {},
            morass: {},
            esfera: {},
          }}
          colon={false}
        >
          <Row gutter={[8, 8]}>
            {arcaneLocals.map(({ name, key, coin, daily, pquest }) => (
              <Col key={key} span={24} md={12} xl={8}>
                <Card title={name}>
                  <Row gutter={[0, 12]}>
                    <Col span={24}>
                      <Form.Item
                        name={[key, 'count']}
                        style={{ marginBottom: 0 }}
                      >
                        <ArcaneInputRangeSync name={key} />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <h4>每日符文獲取來源:</h4>
                    </Col>
                    <Col span={12}>
                      <Tooltip title={`每日任務: 此地區每日可獲得 ${daily} 個`}>
                        <Form.Item
                          name={[key, 'quest']}
                          label={
                            <Avatar
                              shape="square"
                              src="/daily.png"
                              alt="daily"
                              style={{ cursor: 'pointer' }}
                            />
                          }
                          style={{ display: 'inline-flex', marginBottom: 0 }}
                        >
                          <Switch
                            checkedChildren={daily}
                            unCheckedChildren="0"
                          />
                        </Form.Item>
                      </Tooltip>
                    </Col>
                    {pquest && (
                      <Col span={12}>
                        <Tooltip
                          title={`${pquest.name}: 最多可獲得 ${
                            pquest.count || pquest.dailyMax
                          } 個`}
                        >
                          <Form.Item
                            name={[key, 'party']}
                            label={
                              <div style={{ cursor: 'pointer' }}>組隊任務</div>
                            }
                            style={{ display: 'inline-flex', marginBottom: 0 }}
                          >
                            {pquest.count ? (
                              <Switch
                                checkedChildren={pquest.count}
                                unCheckedChildren="0"
                              />
                            ) : (
                              <InputNumber
                                min={0}
                                max={pquest.dailyMax}
                                defaultValue={0}
                              />
                            )}
                          </Form.Item>
                        </Tooltip>
                      </Col>
                    )}
                    {coin && (
                      <Col span={12}>
                        <Tooltip
                          title={
                            coin.desc
                              ? coin.desc
                              : `${coin.name}: 最多可獲得 ${coin.dailyMax} 個, ${coin.unit} 個可兌換 1 個符文`
                          }
                        >
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Form.Item
                              name={[key, 'coin']}
                              label={
                                <Avatar
                                  src={`/${key}-coin.png`}
                                  alt={`${key}-coin`}
                                  style={{ cursor: 'pointer' }}
                                />
                              }
                              style={{
                                display: 'inline-flex',
                                marginBottom: 0,
                              }}
                            >
                              <InputNumber
                                min={0}
                                max={coin.dailyMax || Infinity}
                                defaultValue={0}
                                style={{ width: 70 }}
                              />
                            </Form.Item>
                            <span>&nbsp;/&nbsp;{coin.unit}</span>
                          </div>
                        </Tooltip>
                      </Col>
                    )}
                    <Col span={12} xl={24}>
                      <Tooltip title="每日額外獲取數 Ex. 選擇秘法符文">
                        <Form.Item
                          name={[key, 'extra']}
                          label={
                            <Avatar
                              src="/selectable.png"
                              alt="selectable"
                              style={{ cursor: 'pointer' }}
                            />
                          }
                          style={{ display: 'inline-flex', marginBottom: 0 }}
                        >
                          <InputNumber min={0} defaultValue={0} />
                        </Form.Item>
                      </Tooltip>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
          <Form.Item shouldUpdate={() => true} wrapperCol={{ xs: 24, sm: 24 }}>
            {({ getFieldValue }) => {
              const statisticData = arcaneLocals
                .map(({ name, key, coin, daily }) => {
                  const {
                    count: currentCount,
                    daily: dailySymbol = 0,
                    coin: dailyCoin = 0,
                    quest: dailyQuest,
                  } = getFieldValue(key)
                  const dailyTotalCount =
                    dailySymbol +
                    (coin && dailyCoin
                      ? (dailyCoin + coin.basic) / coin.unit
                      : 0) +
                    (dailyQuest ? daily : 0)
                  const { completeDate, remainDays } = toRowData({
                    key,
                    level: 20,
                    currentCount,
                    dailyTotalCount,
                  })
                  return {
                    level: arcMatching(currentCount).level || 0,
                    completeDate,
                    remainDays,
                  }
                })
                .reduce(
                  (acc, inc) => {
                    acc.completeDate = acc.completeDate
                      ? moment(inc.completeDate).isValid() &&
                        moment(inc.completeDate).isAfter(
                          acc.completeDate,
                          'days'
                        )
                        ? inc.completeDate
                        : acc.completeDate
                      : moment(inc.completeDate).isValid()
                      ? inc.completeDate
                      : undefined
                    acc.total += inc.level
                    acc.holded += inc.level !== 0 ? 1 : 0
                    acc.remainDays =
                      inc.remainDays !== Infinity &&
                      inc.remainDays > acc.remainDays
                        ? inc.remainDays
                        : acc.remainDays
                    return acc
                  },
                  { total: 0, holded: 0, remainDays: 0 }
                )
              return (
                <Row gutter={[8, 8]}>
                  <Col xs={24} sm={12} md={6}>
                    <Card>
                      <Statistic
                        title="Arc"
                        value={
                          statisticData.total * 10 + statisticData.holded * 20
                        }
                        suffix={`/ ${statisticData.holded * 220}`}
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Card>
                      <Statistic
                        title="屬性加成量"
                        value={cashFormat(
                          (statisticData.total + statisticData.holded * 2) * 100
                        )}
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Card>
                      <Statistic
                        title="完成日期(天數)"
                        value={
                          statisticData.total
                            ? statisticData.remainDays === 0
                              ? '永遠完成不了'
                              : statisticData.completeDate
                            : '無'
                        }
                        suffix={
                          statisticData.remainDays
                            ? `(${cashFormat(statisticData.remainDays)}天)`
                            : ''
                        }
                      />
                    </Card>
                  </Col>
                </Row>
              )
            }}
          </Form.Item>
          <Form.Item shouldUpdate={() => true} wrapperCol={{ xs: 24, sm: 24 }}>
            {({ getFieldValue }) => (
              <ResultTable getFieldValue={getFieldValue} />
            )}
          </Form.Item>
        </Form>
      </Content>
      <Footer className={styles.footer} style={{ textAlign: 'center' }}>
        Arcane Symble Calculator ©2020 Created by 丫村
      </Footer>
    </Layout>
  )
}
