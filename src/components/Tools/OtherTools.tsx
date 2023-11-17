import { Suspense } from 'react';

import Col from 'antd/lib/col';

import SymbolCatalyst from './SymbolCatalyst';
import ForceEffect from './ForceEffect';

const OtherTools = () => {
  return (
    <>
      <Col span={24} md={12} xl={8}>
        <Suspense>
          <SymbolCatalyst />
        </Suspense>
      </Col>
      <Col span={24} md={12} xl={16}>
        <Suspense>
          <ForceEffect />
        </Suspense>
      </Col>
    </>
  );
};

export default OtherTools;
