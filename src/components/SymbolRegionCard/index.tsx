import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';

import I18nText from '@/components/I18nText';
import I18nTooltip from '@/components/I18nTooltip';

import SymbolRangeSync from '@/components/SymbolRegionCard/SymbolRangeSync';

/* mapping */
import SymbolRegionData, { SymbolType } from '@/mapping/region';

export interface SymbolRegionCardProps {
  region: SymbolType;
  index: number;
}
const SymbolRegionCard: React.FC<SymbolRegionCardProps> = ({ region, index }) => {
  const { name, extraRegion, key, daily, pquest, isEstimate } = SymbolRegionData[region][index];

  return (
    <Card
      title={
        <>
          <I18nText id={name as keyof IntlMessages} />
          {isEstimate && <I18nText id="is_estimated" className="text-stone-400 text-xs" />}
        </>
      }
    >
      <Row gutter={[0, 12]}>
        <Col span={24}>
          <SymbolRangeSync region={region} name={key} />
        </Col>
        <Col span={24}>
          <Row>
            <Col flex="none">
              <I18nTooltip id="extra_symbol" className="flex items-center">
                {/* Selectable input */}
                {/* Selectable level preview */}
              </I18nTooltip>
            </Col>
            <Col xs={24} sm={5} className="ml-auto">
              {/* Selectable apply button */}
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <h4>
            <I18nText id="daily_symbol_source" />:
          </h4>
        </Col>
        <Col span={extraRegion ? 24 : 12} sm={12}>
          {/* daily quest switch */}
          {/* daily quest silder */}
        </Col>
        {pquest && <Col span={12}>{/* party quest switch */}</Col>}
      </Row>
    </Card>
  );
};

export default SymbolRegionCard;
