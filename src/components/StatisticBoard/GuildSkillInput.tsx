'use client';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { guildSkillAtom } from '@/store/settings';

import Space from 'antd/lib/space';
import InputNumber from 'antd/lib/input-number';

import SymbolInfo from '@/mapping/force';
import { SymbolType } from '@/mapping/region';

interface GuildSkillInputProps {
  region: SymbolType;
}
const GuildSkillInput: React.FC<GuildSkillInputProps> = ({ region }) => {
  const [guildSkill, setGuildSkill] = useAtom(guildSkillAtom);
  const t = useTranslations();
  const CurrentSymbolInfo = SymbolInfo[region];

  if (!CurrentSymbolInfo.guild) {
    return null;
  }

  const guildForce = CurrentSymbolInfo.guild.formula(guildSkill);

  const handleChange = (value: number | null) => {
    setGuildSkill(value ?? 0);
  };

  return (
    <Space>
      <InputNumber
        value={guildSkill === 0 ? null : guildSkill}
        onChange={handleChange}
        size="small"
        min={0}
        max={CurrentSymbolInfo.guild.maxLevel}
        precision={0}
        placeholder={t('guild_skill')}
      />
      <span>/</span>
      <span>{guildForce}</span>
    </Space>
  );
};

export default GuildSkillInput;
