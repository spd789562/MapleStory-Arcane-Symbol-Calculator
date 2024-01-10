import Space from 'antd/lib/space';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import ForwardOutlined from '@ant-design/icons/ForwardOutlined';

import I18nText from '@/components/I18nText';
import FormItem from '@/components/Form/FormItem';

import CatalystAvatar from './CatalystAvatar';
import SymbolTypeSelect from './SymbolTypeSelect';
import CurrentRangeSync from './CurrentRangeSync';
import AfterRangeSync from './AfterRangeSync';
import CustomSwitch from './CustomSwitch';
import CostToUpgrade from './CostToUpgrade';
import RegionSymbolTypeSelect from './RegionSymbolTypeSelect';

const SymbolCatalyst = () => {
  return (
    <Card
      title={
        <Space>
          <CatalystAvatar />
          <I18nText id="symbol_catalyst" />
          <SymbolTypeSelect />
        </Space>
      }
    >
      <Row gutter={[0, 12]}>
        <Col span={24}>
          <FormItem name="table_zone" id="table_zone" className="mb-1">
            <RegionSymbolTypeSelect />
          </FormItem>
        </Col>
        <Col span={24}>
          <CurrentRangeSync />
        </Col>
        <Col span={24} className="-mt-5">
          <Row align="middle">
            <div className="inline-block">
              <div>
                <I18nText id="option_custom" />
                <CustomSwitch />
              </div>
              <div>
                <CostToUpgrade />
              </div>
            </div>
            <ForwardOutlined
              rotate={90}
              className="text-[#6373ca] text-[24px] ml-3"
            />
          </Row>
        </Col>
        <Col span={24}>
          <AfterRangeSync />
        </Col>
      </Row>
    </Card>
  );
};

export default SymbolCatalyst;
