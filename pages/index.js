import React, { Fragment } from 'react'
import {
  Layout,
  Form,
  InputNumber,
  Row,
  Col,
  BackTop,
  Card,
  Avatar,
  Tooltip,
  Switch,
  Select,
} from 'antd'

/* component */
import ArcaneInputRangeSync from '../src/component/arcane-input-range-sync'
import ResultTable from '../src/component/result-table'
import StatisticBoard from '../src/component/statistic-board'
import GoogleAD from '../src/component/google-ad'

/* mapping */
import ArcZone from '../src/mapping/arcane-river-zone'

/* helper */
import { withTranslation } from '../src/i18n'

import styles from '../styles/Home.module.css'

const { Header, Content, Footer } = Layout

const initialValues = {
  role: 0,
  vanishingjourney: {},
  chuchu: {},
  lachelein: {},
  arcana: {},
  morass: {},
  esfera: {},
}

function Home({ t, i18n }) {
  const [form] = Form.useForm()
  return (
    <Layout className="layout">
      <Header className={styles.header}>
        <div className={styles['header-container']}>
          <h2 style={{ marginBottom: 0 }}>
            {t('title')}
            &nbsp;
          </h2>
          <Select
            onChange={(value) =>
              i18n.changeLanguage && i18n.changeLanguage(value)
            }
            defaultValue={i18n.language}
            style={{ marginLeft: 'auto' }}
          >
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="zh_tw">繁體中文</Select.Option>
          </Select>
        </div>
      </Header>
      <BackTop />
      <Content className={styles.content}>
        <Form form={form} initialValues={initialValues} colon={false}>
          <Row gutter={[8, 8]}>
            {ArcZone.map(({ name, key, daily, pquest }) => (
              <Col key={key} span={24} md={12} xl={8}>
                <Card title={t(name)}>
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
                      <h4>{t('daily_symbol_source')}:</h4>
                    </Col>
                    <Col span={12}>
                      <Tooltip title={t('daily_quest_tips', { count: daily })}>
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
                          title={
                            pquest.desc
                              ? t(pquest.desc, {
                                  ...pquest,
                                  name: t(pquest.name),
                                })
                              : t('party_quest_tips', {
                                  name: t(pquest.name),
                                  count: pquest.count || pquest.dailyMax,
                                }) +
                                (pquest.unit
                                  ? t('party_quest_tips_exchange', pquest)
                                  : '')
                          }
                        >
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Form.Item
                              name={[key, 'party']}
                              label={
                                pquest.type === 'symbol' ? (
                                  <div style={{ cursor: 'pointer' }}>
                                    {t('party_quest')}
                                  </div>
                                ) : (
                                  <Avatar
                                    src={`/${key}-coin.png`}
                                    alt={`${key}-coin`}
                                    style={{ cursor: 'pointer' }}
                                  />
                                )
                              }
                              style={{
                                display: 'inline-flex',
                                marginBottom: 0,
                              }}
                            >
                              {/* if party quest has static value, use swtich button */}
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
                                  style={{ width: 70 }}
                                  precision={0}
                                />
                              )}
                            </Form.Item>
                            {pquest.unit && (
                              <span>&nbsp;/&nbsp;{pquest.unit}</span>
                            )}
                          </div>
                        </Tooltip>
                      </Col>
                    )}
                    <Col span={12} xl={24}>
                      <Tooltip title={t('extra_symbol')}>
                        <Form.Item
                          name={[key, 'daily']}
                          label={
                            <Avatar
                              src="/selectable.png"
                              alt="selectable"
                              style={{ cursor: 'pointer' }}
                            />
                          }
                          style={{ display: 'inline-flex', marginBottom: 0 }}
                        >
                          <InputNumber
                            min={0}
                            defaultValue={0}
                            style={{ width: 70 }}
                            precision={0}
                          />
                        </Form.Item>
                      </Tooltip>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
          <Form.Item shouldUpdate wrapperCol={{ xs: 24, sm: 24 }}>
            {({ getFieldsValue }) => {
              const fieldsValue = getFieldsValue()
              const data = Object.keys(fieldsValue).length
                ? fieldsValue
                : initialValues
              return (
                <Fragment>
                  <StatisticBoard data={data} />
                  <ResultTable data={data} />
                </Fragment>
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
        Arcane Symble Calculator ©2020 Created by 丫村
      </Footer>
    </Layout>
  )
}

Home.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(Home)
