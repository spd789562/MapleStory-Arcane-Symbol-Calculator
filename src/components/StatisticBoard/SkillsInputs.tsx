'use client';
import { useAtomValue } from 'jotai';

import { symbolTypeAtom } from '@/store/tab';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import I18nTooltip from '@/components/I18nTooltip';
import HyperStatInput from './HyperStatInput';
import GuildSkillInput from './GuildSkillInput';

import SymbolInfo from '@/mapping/force';

const SkillInputs: React.FC = () => {
  const symbolType = useAtomValue(symbolTypeAtom);

  if (!symbolType) {
    return null;
  }

  const CurrentSymbolInfo = SymbolInfo[symbolType];

  if (!CurrentSymbolInfo.hyper && !CurrentSymbolInfo.guild) {
    return null;
  }

  return (
    <Row gutter={[0, 8]}>
      {CurrentSymbolInfo.hyper && (
        <Col span={24}>
          <I18nTooltip id="hyper_stat_tips">
            <HyperStatInput region={symbolType} />
          </I18nTooltip>
        </Col>
      )}
      {CurrentSymbolInfo.guild && (
        <Col span={24}>
          <I18nTooltip id="guild_skill_tips">
            <GuildSkillInput region={symbolType} />
          </I18nTooltip>
        </Col>
      )}
    </Row>
  );
};

export default SkillInputs;
