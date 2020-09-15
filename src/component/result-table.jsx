import dynamic from 'next/dynamic'

import { Fragment } from 'react'
import { Table } from 'antd'

/* mapping */
import ArcaneSymbolMapping from '../mapping/arcane'
import ArcaneSymbol from '../mapping/arcane-info'
import ArcZone from '../mapping/arcane-river-zone'

/* utils */
import numberFormat from '../util/number-format'
import parserTableData from '../util/parser-table-data'
import moment from 'moment'

const Line = dynamic(() => import('@ant-design/charts/es/line'), {
  ssr: false,
})

const renderIfMaxLevel = (text, row) =>
  row.currentLevel === ArcaneSymbol.maxLevel ||
  row.currentLevel === 0 ||
  row.dailyTotalCount === 0
    ? {
        children:
          row.currentLevel === ArcaneSymbol.maxLevel
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
  row.currentLevel === ArcaneSymbol.maxLevel ||
  row.currentLevel === 0 ||
  row.dailyTotalCount === 0
    ? {
        children: text,
        props: {
          colSpan: 0,
        },
      }
    : typeof text === 'number'
    ? numberFormat(text)
    : text

const useTableData = (data) =>
  ArcZone.map(({ name, key, daily, pquest }) => {
    const {
      count: currentCount,
      daily: dailySymbol = 0,
      quest: dailyQuest = 0,
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
    const subTableData =
      !!dailyTotalCount && !!currentCount
        ? ArcaneSymbolMapping.filter(({ stack }) => {
            return currentCount < stack
          }).map(({ level }) =>
            parserTableData({
              key: `${key}-${level}`,
              level,
              currentCount,
              dailyTotalCount,
            })
          )
        : []
    return {
      ...parserTableData({
        key,
        level: 20,
        currentCount,
        dailyTotalCount,
      }),
      dailyTotalCount,
      currentCount,
      name,
      ...(subTableData.length ? { children: subTableData } : {}),
    }
  })

const useChartData = (tableData) => {
  const today = moment().format('YYYY-MM-DD')
  const chartData = Object.values(
    tableData
      .filter(({ currentLevel }) => currentLevel)
      .reduce(
        (acc, inc) => {
          acc.data.push({
            date: today,
            type: inc.key,
            value: (inc.currentLevel + 2) * 10,
          })
          acc.total[today] =
            (acc.total[today] || 0) + (inc.currentLevel + 2) * 10
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
                type: 'arc',
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

  return Object.entries(chartData)
    .map(([date, data]) =>
      Object.entries(data)
        .filter(([type]) => type === 'arc')
        .map(([type, value]) => ({
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
}

const ResultTable = ({ data }) => {
  const tableData = useTableData(data)
  const chartData = useChartData(tableData)
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
        dataSource={tableData}
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
          seriesField: 'type',
          legend: {
            visible: false,
          },
          xAxis: {
            type: 'dateTime',
            grid: {
              visible: true,
              style: {
                stroke: '#e3e8ec',
                lineWidth: 1,
                lineDash: [0, 0],
              },
            },
          },
          yAxis: {
            visible: true,
            min: chartData.length ? chartData[0].value : 0,
            max: 1320,
          },
          point: {
            visible: true,
            size: 3,
            style: {
              stroke: 'transparent',
            },
          },
        }}
        style={{ backgroundColor: '#fff', marginTop: 8 }}
      ></Line>
    </Fragment>
  )
}

export default ResultTable
