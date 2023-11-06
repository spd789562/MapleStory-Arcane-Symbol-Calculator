import Layout from 'antd/lib/layout';

import { Footer, Header, Content } from 'antd/lib/layout/layout';
import BackTop from 'antd/lib/float-button/BackTop';

import PageHeader from '@/components/Headers/PageHeader';
import OldVersionLinks from '@/components/OldVersionLinks';
import PageFooter from '@/components/PageFooter';

export default function Home() {
  return (
    <Layout>
      <Header className="bg-header-bg p-0 h-unset">
        <PageHeader />
      </Header>
      <Content className="pt-2 px-4 xl:px-0 w-full xl:max-w-header-max xl:mx-auto">
        <OldVersionLinks />
      </Content>
      <BackTop />
      <Footer className="text-center px-4">
        <PageFooter />
      </Footer>
    </Layout>
  );
}
