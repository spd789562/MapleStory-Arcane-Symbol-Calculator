import { Suspense } from 'react';
import Layout from 'antd/lib/layout';
import { Footer, Header, Content } from 'antd/lib/layout/layout';
import BackTop from 'antd/lib/float-button/BackTop';
import Card from 'antd/lib/card';

import PageHeader from '@/components/Headers/PageHeader';
import OldVersionLinks from '@/components/OldVersionLinks';
import { FormStyle } from '@/components/Form/Form';
import Setting from '@/components/Setting';
import ToolTabs from '@/components/ToolTabs';
import Tools from '@/components/Tools';
import {
  ArcaneSymbolRegion,
  GrandisSymbolRegion,
} from '@/components/Tools/SymbolTools';
import OtherTools from '@/components/Tools/OtherTools';
import StatisticBoard from '@/components/StatisticBoard';
import ResultTable from '@/components/Result/Table';
import ResultChart from '@/components/Result/Chart';
import PageFooter from '@/components/PageFooter';

export default function Home() {
  return (
    <Layout>
      <Header className="bg-header-bg p-0 h-unset">
        <PageHeader />
      </Header>
      <Content className="pt-2 px-4 xl:px-0 w-full xl:max-w-header-max xl:mx-auto">
        <OldVersionLinks />
        <FormStyle />
        <Card className="mb-2">
          <Setting />
        </Card>
        <Card className="mb-2">
          <ToolTabs />
        </Card>
        <Tools
          ArcaneTab={
            <Suspense>
              <ArcaneSymbolRegion />
            </Suspense>
          }
          GrandisTab={
            <Suspense>
              <GrandisSymbolRegion />
            </Suspense>
          }
          OtherToolsTab={
            <Suspense>
              <OtherTools />
            </Suspense>
          }
          StatisticBoard={<StatisticBoard />}
          ResultTable={<ResultTable />}
          ResultChart={<ResultChart />}
        />
      </Content>
      <BackTop />
      <Footer className="text-center px-4">
        <Suspense>
          <PageFooter />
        </Suspense>
      </Footer>
    </Layout>
  );
}
