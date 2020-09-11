import React, { Suspense } from 'react'
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
} from 'antd'
import ArcaneInputRangeSync from '../src/component/arcane-input-range-sync'
// import { Line } from '@ant-design/charts'

import ArcMapping from '../src/mapping/arcane'
import ArcInfo from '../src/mapping/arcane-info'

import styles from '../styles/Home.module.css'

import moment from 'moment'
import { Fragment } from 'react'

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
  { name: '消逝的旅途', key: 'vanishingjourney' },
  { name: '啾啾愛爾蘭', key: 'chuchu' },
  {
    name: '拉契爾恩',
    key: 'lachelein',
    hasCoin: true,
    coinUnit: 30,
    coin: { unit: 30 },
  },
  {
    name: '阿爾卡納',
    key: 'arcana',
    hasCoin: true,
    coinUnit: 3,
    coin: { unit: 3, dailyMax: 30 },
  },
  { name: '魔菈斯', key: 'morass' },
  { name: '艾斯佩拉', key: 'esfera' },
]

const arcMatching = (arcane) =>
  Object.values(ArcMapping).find(
    // get match range of arcane
    (arc, index, arr) =>
      arcane >= arc.stack &&
      arcane < (arr[index + 1] ? arr[index + 1].stack : arc.stack + 1)
  ) || { level: 0, stack: 0, count: 0 }

const toRowData = ({ key, level, currentCount, dailyTotalCount }) => {
  const TargetArcane = ArcMapping[level]
  const currentArcane = arcMatching(currentCount)
  const remainDays = Math.ceil(
    (TargetArcane.stack - currentCount) / dailyTotalCount
  )
  const cashFormat = (number) =>
    `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
      `(${remainDays}天)`,
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
    : text

const ResultTable = ({ getFieldsValue }) => {
  const FinialData = arcaneLocals.map(({ name, key, coin }) => {
    const {
      [key]: currentCount,
      [`${key}-daily`]: dailySymbol = 0,
      [`${key}-coin`]: dailyCoin = 0,
    } = getFieldsValue()
    const dailyTotalCount = dailySymbol + (coin ? dailyCoin / coin.unit : 0)
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
        <Form form={form} initialValues={{}}>
          {/* <Form.Item label="職業" name="role">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="1">一般</Radio.Button>
              <Radio.Button value="2">傑諾</Radio.Button>
              <Radio.Button value="3">惡魔復仇者</Radio.Button>
            </Radio.Group>
          </Form.Item> */}
          <Row gutter={[8, 8]}>
            {arcaneLocals.map(({ name, key, coin }) => (
              <Col key={key} span={24} md={12}>
                <Card>
                  <Card.Meta
                    avatar={
                      <Avatar src={`/arcane-symbol-${key}.png`} alt={key} />
                    }
                    title={<Fragment>{name}</Fragment>}
                    description={
                      <Fragment>
                        {/* <Form.Item name={key} wrapperCol={{ xs: 24, sm: 24 }}>
                          <ArcaneInputRangeSync name={key} />
                        </Form.Item> */}
                        <Col span={24}>
                          <Form.Item
                            name={key}
                            style={{ display: 'inline-flex', marginBottom: 0 }}
                          >
                            <ArcaneInputRangeSync name={key} />
                          </Form.Item>
                        </Col>
                        <Form.Item
                          name={`${key}-daily`}
                          label="每日可獲得數"
                          style={{ display: 'inline-flex', marginBottom: 0 }}
                        >
                          <InputNumber min={0} defaultValue={0} />
                        </Form.Item>
                        {coin && (
                          <Form.Item
                            name={`${key}-coin`}
                            label={
                              <Avatar
                                src={`/${key}-coin.png`}
                                alt={`${key}-coin`}
                              />
                            }
                            style={{ display: 'inline-flex', marginBottom: 0 }}
                          >
                            <InputNumber
                              min={0}
                              max={coin.dailyMax || Infinity}
                              defaultValue={0}
                            />
                          </Form.Item>
                        )}
                      </Fragment>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Form.Item shouldUpdate={() => true} wrapperCol={{ xs: 24, sm: 24 }}>
            {({ getFieldsValue }) => {
              const statisticData = arcaneLocals
                .map(({ name, key, coin }) => {
                  const {
                    [key]: currentCount,
                    [`${key}-daily`]: dailySymbol = 0,
                    [`${key}-coin`]: dailyCoin = 0,
                  } = getFieldsValue()
                  const dailyTotalCount =
                    dailySymbol + (coin ? dailyCoin / coin.unit : 0)
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
                        value={statisticData.total * 100}
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
                            ? `(${statisticData.remainDays}天)`
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
            {({ getFieldsValue }) => (
              <ResultTable getFieldsValue={getFieldsValue} />
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
