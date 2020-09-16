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
} from 'antd'

/* component */
import ArcaneInputRangeSync from '../src/component/arcane-input-range-sync'
import ResultTable from '../src/component/result-table'
import StatisticBoard from '../src/component/statistic-board'
import GoogleAD from '../src/component/google-ad'

/* mapping */
import ArcZone from '../src/mapping/arcane-river-zone'

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

export default function Home() {
  const [form] = Form.useForm()
  return (
    <Layout className="layout">
      <Header className={styles.header}>
        <div className={styles['header-container']}>
          <h2>秘法符文計算機</h2>
        </div>
      </Header>
      <BackTop />
      <Content className={styles.content}>
        <Form form={form} initialValues={initialValues} colon={false}>
          <Row gutter={[8, 8]}>
            {ArcZone.map(({ name, key, daily, pquest }) => (
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
                          title={
                            pquest.desc
                              ? pquest.desc
                              : `${pquest.name}: 最多可獲得 ${
                                  pquest.count || pquest.dailyMax
                                } 個${
                                  pquest.unit
                                    ? `, ${pquest.unit} 個可兌換 1 個符文`
                                    : ''
                                }`
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
                                    組隊任務
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
                      <Tooltip title="每日額外獲取數 Ex. 選擇秘法符文">
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
            塞一下廣告應該沒關係吧(´・ω・`)
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
