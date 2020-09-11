import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import {
  Layout,
  Form,
  Input,
  Radio,
  InputNumber,
  Slider,
  Row,
  Col,
  Table,
  BackTop,
} from 'antd'
import ArcaneInputRangeSync from '../src/component/arcane-input-range-sync'
// import { Line } from '@ant-design/charts'

import formFieldAreUpdated from '../src/util/form-fields-are-updated'

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
                key,
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
      fieldKey: key,
      ...(subTableData.length ? { children: subTableData } : {}),
    }
  })
  const chartData = Object.entries(
    FinialData.filter(({ currentLevel }) => currentLevel).reduce((acc, inc) => {
      acc['2020-09-10'] =
        (acc['2020-09-10'] || 0) + 30 + (inc.currentLevel - 1) * 10
      if (inc.children) {
        inc.children.forEach(
          ({ completeDate, level }) =>
            (acc[completeDate] = (acc[completeDate] || 0) + 10)
        )
      }
      return acc
    }, {})
  )
    .map(([date, value]) => ({ date, value }))
    .sort((a, b) => moment(a.date).unix() - moment(b.date).unix())
    .reduce((acc, inc, index, arr) => {
      if (!acc.length) acc = [...arr]
      if (index !== 0) acc[index].value += arr[index - 1].value || 0
      return acc
    }, [])
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
      <Line
        {...{
          title: {
            visible: true,
            text: 'arc 趨勢圖',
          },
          forceFit: true,
          data: chartData,
          padding: 'auto',
          xField: 'date',
          yField: 'value',
          xAxis: {
            type: 'dateTime',
          },
        }}
      ></Line>
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
        <h2>秘法符文計算機</h2>
      </Header>
      <BackTop />
      <Content className={styles.content}>
        <Form
          form={form}
          initialValues={{}}
          labelCol={{ xs: 6, sm: 8 }}
          wrapperCol={{ xs: 18, sm: 16 }}
        >
          {/* <Form.Item label="職業" name="role">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="1">一般</Radio.Button>
              <Radio.Button value="2">傑諾</Radio.Button>
              <Radio.Button value="3">惡魔復仇者</Radio.Button>
            </Radio.Group>
          </Form.Item> */}
          {arcaneLocals.map(({ name, key, coin }) => (
            <Row key={key}>
              <Col span={24}>
                <div
                  className="ant-row ant-form-item"
                  style={{ marginBottom: 0 }}
                >
                  <div class="ant-col ant-form-item-label">
                    <label class="" title={name}>
                      {name}
                    </label>
                  </div>
                </div>
              </Col>
              <Col span={24} sm={12} md={8}>
                <Form.Item name={key} wrapperCol={{ xs: 24, sm: 24 }}>
                  <ArcaneInputRangeSync name={key} />
                </Form.Item>
              </Col>
              <Col span={24} sm={12} md={8}>
                <Form.Item name={`${key}-daily`} label="每日可獲得數">
                  <InputNumber min={0} defaultValue={0} />
                </Form.Item>
              </Col>
              {coin && (
                <Col span={24} sm={12} md={8}>
                  <Form.Item name={`${key}-coin`} label="每日硬幣數">
                    <InputNumber
                      min={0}
                      max={coin.dailyMax || Infinity}
                      defaultValue={0}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          ))}
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
