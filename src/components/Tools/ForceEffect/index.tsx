import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Space from 'antd/lib/space';
import Card from 'antd/lib/card';
import FormItem from '@/components/Form/FormItem';
import I18nText from '@/components/I18nText';

import ForceTypeSelect from './ForceTypeSelect';
import ForceEFfectTypeRadio from './ForceEffectTypeRadio';
import TargetEffectInput from './TargetForceInput';
import CustomForceInput from './CustomForceInput';
import ResultTable from './ResultTable';

const ForceEffectTool = () => {
  return (
    <Card
      title={
        <Space>
          <I18nText id="force_effect" />
          <ForceTypeSelect />
        </Space>
      }
    >
      <Row gutter={[0, 12]}>
        <Col span={24} className="-mt-2">
          <ForceEFfectTypeRadio />
        </Col>
        <FormItem name="target_force" id="mob_force" className="mb-0">
          <TargetEffectInput />
        </FormItem>
        <FormItem name="current_force" id="current_force" className="mb-0">
          <CustomForceInput />
        </FormItem>
        <Col span={24}>
          <ResultTable />
        </Col>
      </Row>
    </Card>
  );
};

export default ForceEffectTool;
