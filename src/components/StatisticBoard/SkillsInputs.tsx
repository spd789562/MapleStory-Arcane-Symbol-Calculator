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
        <I18nTooltip id="hyper_stat_tips">
          <Col span={24}>
            <HyperStatInput region={symbolType} />
          </Col>
        </I18nTooltip>
      )}
      {CurrentSymbolInfo.guild && (
        <I18nTooltip id="guild_skill_tips">
          <Col span={24}>
            <GuildSkillInput region={symbolType} />
          </Col>
        </I18nTooltip>
      )}
    </Row>
  );
};

export default SkillInputs;
