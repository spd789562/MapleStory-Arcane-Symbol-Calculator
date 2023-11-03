import Layout from 'antd/lib/layout';

import { Footer, Header } from 'antd/lib/layout/layout';

import PageHeader from '@/components/Headers/PageHeader';
import PageFooter from '@/components/PageFooter';

export default function Home() {
  return (
    <Layout>
      <Header className="bg-header-bg p-0 h-unset">
        <PageHeader />
      </Header>
      <Footer className="text-center px-4">
        <PageFooter />
      </Footer>
    </Layout>
  );
}
