import Compact from 'antd/lib/space/Compact';

import I18nTooltip from '@/components/I18nTooltip';
import SymbolAvatar from '@/components/SymbolAvatar';
import FormItem from '@/components/Form/FormItem';
import LevelInput from '@/components/SymbolInputRangeSync/LevelInput';
import ExpInput from '@/components/SymbolInputRangeSync/ExpInput';
import TotalExpDisplay from '@/components/SymbolInputRangeSync/TotalExpDisplay';
import TotalExpSlider from '@/components/SymbolInputRangeSync/TotalExpSlider';

import type { SymbolType, SymbolRegionType } from '@/mapping/region';

import symbolMatch from '@/util/symbol-match';

interface SymbolInputRangeSyncProps {
  name: SymbolRegionType | 'default';
  region: SymbolType;
  value: number;
  onChange?: (value: number | null) => void;
  disabled?: boolean;
}
const SymbolInputRangeSync: React.FC<SymbolInputRangeSyncProps> = (props) => {
  const { name, region, value, onChange, disabled } = props;
  const levelData = symbolMatch(region, value);

  return (
    <>
      <FormItem
        name={name}
        label={<SymbolAvatar name={name} region={region} />}
        style={{ display: 'inline-flex', marginBottom: 0 }}
      >
        <I18nTooltip id="symbol_level_tips">
          <Compact>
            <LevelInput value={value} onChange={onChange} levelData={levelData} region={region} disabled={disabled} />
            <div className="ant-input-group-addon px-2 bg-stone-100 border-solid border border-x-0 border-stone-300">
              /
            </div>
            <ExpInput value={value} onChange={onChange} levelData={levelData} disabled={disabled} />
            <div className="ant-input-group-addon border-solid border border-stone-300 pr-2 rounded-r-md">
              <TotalExpDisplay value={value} region={region} />
            </div>
          </Compact>
        </I18nTooltip>
      </FormItem>
      <TotalExpSlider value={value} region={region} onChange={onChange} disabled={disabled} />
    </>
  );
};

export default SymbolInputRangeSync;
