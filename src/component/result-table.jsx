import dynamic from 'next/dynamic'

import { Fragment } from 'react'
import { Table, Card } from 'antd'
import { withTranslation } from '../i18n'

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

const useTableData = (data, t) =>
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
              zone: key,
              level,
              currentCount,
              dailyTotalCount,
              t,
            })
          )
        : []
    return {
      ...parserTableData({
        key,
        zone: key,
        level: 20,
        currentCount,
        dailyTotalCount,
        t,
      }),
      dailyTotalCount,
      currentCount,
      name,
      ...(subTableData.length ? { children: subTableData } : {}),
    }
  })

const useChartData = (tableData, data, t) => {
  const today = moment().format('YYYY-MM-DD')
  const hyperStatPower = ArcaneSymbol.hyper.formula(data.hyperStat || 0)
  const guildPower = ArcaneSymbol.guild.formula(data.guildSkill || 0)
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
        { data: [], total: { [today]: hyperStatPower + guildPower } }
      )
  )
    .reduce(
      (acc, inc) =>
        Array.isArray(inc)
          ? [...inc, ...acc]
          : [
              ...Object.entries(inc).map(([date, value]) => ({
                date,
                type: 'ARC',
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
        .filter(([type]) => type === 'ARC')
        .map(([type, value]) => ({
          type: t('arcane_power'),
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

const ResultTable = ({ data, t }) => {
  const tableData = useTableData(data, t)
  const chartData = useChartData(tableData, data, t)

  const renderTextIfMaxLevel = (text, row) =>
    row.currentLevel === ArcaneSymbol.maxLevel ||
    row.currentLevel === 0 ||
    row.dailyTotalCount === 0
      ? {
          children:
            row.currentLevel === ArcaneSymbol.maxLevel
              ? t('table_symbol_max')
              : row.currentLevel === 0
              ? t('table_symbol_none')
              : t('table_symbol_never', { level: row.currentLevel }),
          props: {
            colSpan: 4,
          },
        }
      : text

  return (
    <Fragment>
      <Table
        columns={[
          {
            title: t('table_zone'),
            dataIndex: 'name',
            key: 'name',
            width: 120,
            align: 'center',
          },
          {
            title: t('table_symbol_level'),
            dataIndex: 'level',
            key: 'level',
            align: 'center',
            width: 60,
            render: renderTextIfMaxLevel,
          },
          {
            title: t('complete_date'),
            dataIndex: 'completeDateText',
            key: 'completeDateText',
            align: 'center',
            width: 190,
            render: renderEmptyIfMaxLevel,
          },
          {
            title: t('tabel_total_symbol'),
            dataIndex: 'accumulativeNeed',
            key: 'accumulativeNeed',
            align: 'center',
            width: 100,
            render: renderEmptyIfMaxLevel,
          },
          {
            title: t('tabel_total_cost'),
            dataIndex: 'totalCost',
            key: 'totalCost',
            align: 'center',
            width: 120,
            render: renderEmptyIfMaxLevel,
          },
        ]}
        dataSource={tableData.map((data) => ({
          ...data,
          name: t(data.name),
        }))}
        pagination={false}
        scroll={{ x: '100%' }}
        sticky
      ></Table>
      <Card title={t('chart_title')} style={{ marginTop: 8 }}>
        <Line
          {...{
            height: 400,
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
              max: 1450,
            },
            point: {
              visible: true,
              size: 3,
              style: {
                stroke: 'transparent',
                fill: '#5b8ff9',
              },
            },
          }}
          style={{ backgroundColor: '#fff', marginTop: 8 }}
        />
      </Card>
    </Fragment>
  )
}

export default withTranslation('index')(ResultTable)
