import React, { Fragment, useCallback, useEffect } from 'react'
import {
  Layout,
  Form,
  Row,
  Col,
  BackTop,
  Select,
  Button,
  Card,
  Tabs,
  Switch,
} from 'antd'

/* component */
import Setting from '../src/component/setting'
import ArcaneRegionCard from '../src/component/arcane-region-card'
import SymbolCatalyst from '../src/component/symbol-catalyst'
import ForceEffect from '../src/component/force-effect'
import ResultTable from '../src/component/result-table'
import StatisticBoard from '../src/component/statistic-board'
import GoogleAD from '../src/component/google-ad'

/* mapping */
import SymbolRegion from '../src/mapping/region'

/* helper */
import { withTranslation } from '@i18n'
import { times, toPairs } from 'ramda'

import styles from '../styles/Home.module.css'

import { debounce } from 'throttle-debounce'

const { Header, Content, Footer } = Layout

const initialValues = {
  region: 'arcane',
  role: 0,
  resetDay: 3,
  currentWeekIsDone: false,
  /* arc */
  vanishingjourney: {},
  chuchu: {},
  lachelein: {},
  arcana: {},
  morass: {},
  esfera: {},
  /* aut */
  cernium: {},
  hotelarcs: {},
  odium: {},
}

const storageKey = 'MAPLESTORE_ARCANE_SYMBOL_CALCULATOR_DATA'

const link_daily =
  'https://maplestory-arcane-symbol-calculator-git-reserv-35cbad-spd789562.vercel.app'

const link_before =
  'https://maplestory-arcane-symbol-calculator.vercel.app'

function Home({ t, i18n }) {
  const [form] = Form.useForm()
  // const { initialData, handleSaveToStorage } = useMemo(useLocalStorage, [])
  const handleSaveToStorage = useCallback(
    debounce(1000, (_, AllData) => {
      process.browser &&
        window.localStorage.setItem(storageKey, JSON.stringify(AllData))
    }),
    []
  )
  useEffect(() => {
    if (process.browser) {
      form.setFieldsValue(
        JSON.parse(window.localStorage.getItem(storageKey)) || initialValues
      )
    }
  }, [])
  return (
    <Layout className="layout">
      <Header className={styles.header}>
        <div className={styles['header-container']}>
          <h2 style={{ marginBottom: 0 }}>
            {t('title')}
            &nbsp;
          </h2>
          <div style={{ marginLeft: 'auto', marginRight: '4rem' }}>
            <Button
              onClick={() => {
                form.resetFields()
                handleSaveToStorage({}, initialValues)
              }}
              style={{ marginRight: '.5rem' }}
            >
              {t('reset')}
            </Button>
            <Select
              onChange={(value) =>
                i18n.changeLanguage && i18n.changeLanguage(value)
              }
              defaultValue={i18n.language}
            >
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="zh_tw">繁體中文</Select.Option>
              <Select.Option value="zh_cn">简体中文</Select.Option>
            </Select>
          </div>
        </div>
      </Header>
      <BackTop />
      <Content className={styles.content}>
        <Col span={24} style={{ marginBottom: 8 }}>
          <Button href={link_daily} target="_blank">
            {t('web_daily_party_version')}&nbsp;&gt;
          </Button>
          <Button href={link_before} target="_blank" style={{ marginLeft: 8 }}>
            {t('web_weekly_party_20th_version')}&nbsp;&gt;
          </Button>
        </Col>
        <Form
          form={form}
          initialValues={initialValues}
          onValuesChange={handleSaveToStorage}
          colon={false}
        >
          <Setting />
          <Card style={{ marginBottom: 8 }}>
            <Form.Item name="region" valuePropName="activeKey" noStyle>
              <Tabs>
                <Tabs.TabPane tab={t('arcane_river')} key="arcane" />
                <Tabs.TabPane tab={t('grandis')} key="grandis" />
                <Tabs.TabPane tab={t('other_tools')} key="other" />
              </Tabs>
            </Form.Item>
          </Card>
          <Row gutter={[8, 8]}>
            <Form.Item shouldUpdate noStyle>
              {({ getFieldValue }) => (
                <>
                  {toPairs(SymbolRegion).map(([region, areas]) =>
                    areas.map(({ key }, index) => (
                      <Col
                        key={key}
                        span={24}
                        md={12}
                        xl={8}
                        style={{
                          display:
                            region === getFieldValue('region')
                              ? 'block'
                              : 'none',
                        }}
                      >
                        <ArcaneRegionCard region={region} regionIndex={index} />
                      </Col>
                    ))
                  )}
                  {getFieldValue('region') === 'other' && (
                    <>
                      <Col span={24} md={12} xl={8}>
                        <SymbolCatalyst getFieldValue={getFieldValue} />
                      </Col>
                      <Col span={24} md={12} xl={16}>
                        <ForceEffect getFieldValue={getFieldValue} />
                      </Col>
                    </>
                  )}
                </>
              )}
            </Form.Item>
          </Row>
          <Form.Item shouldUpdate wrapperCol={{ xs: 24, sm: 24 }}>
            {({ getFieldsValue }) => {
              const fieldsValue = getFieldsValue()
              const data = Object.keys(fieldsValue).length
                ? fieldsValue
                : initialValues
              const region = data.region
              return (
                region !== 'other' && (
                  <Fragment>
                    <StatisticBoard data={data} />
                    <ResultTable data={data} />
                  </Fragment>
                )
              )
            }}
          </Form.Item>
        </Form>
        <div className={styles.info}>
          <div className={styles['info-text']}>
            {t('just_a_advertisement')}(´・ω・`)
          </div>
          <GoogleAD />
        </div>
      </Content>
      <Footer className={styles.footer}>
        <div>
          {t('other_tools')}：
          <a href="https://maplesalon.vercel.app">{t('web_maplesalon')}</a>、
          <a href="https://maplestory-boss-crystal-calculator.vercel.app">
            {t('web_boss_crystal_calculator')}
          </a>
        </div>
        {t('title')} ©2020 Created by 丫村
      </Footer>
    </Layout>
  )
}

Home.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(Home)
