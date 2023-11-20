import SymbolRegionCard from '@/components/SymbolRegionCard';
import Col from 'antd/lib/col';

/* mapping */
import SymbolRegionData, { SymbolType } from '@/mapping/region';

interface SymbolRegionProps {
  region: SymbolType;
}
const SymbolRegion = ({ region }: SymbolRegionProps) => {
  return (
    <>
      {SymbolRegionData[region].map((_, index) => (
        <Col key={index} span={24} sm={12} md={8}>
          <SymbolRegionCard region={region} index={index} />
        </Col>
      ))}
    </>
  );
};

export const ArcaneSymbolRegion = () => <SymbolRegion region={SymbolType.Arcane} />;
export const GrandisSymbolRegion = () => <SymbolRegion region={SymbolType.Grandis} />;
