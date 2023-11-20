'use client';
import { useTranslations } from 'next-intl';

import Tooltip from 'antd/lib/tooltip';

import type { SymbolPartyQuestData } from '@/mapping/region';

interface PartyQuestTooltipProps {
  partyQuest: SymbolPartyQuestData;
  children: React.ReactNode;
}
const PartyQuestTooltip: React.FC<PartyQuestTooltipProps> = ({ partyQuest, children }) => {
  const t = useTranslations();
  return (
    <Tooltip
      title={t(partyQuest.doneType === 'weekly' ? 'party_quest_weekly_tips' : 'party_quest_tips', {
        name: t(partyQuest.name as keyof IntlMessages),
        count: partyQuest.count,
      })}
    >
      {children}
    </Tooltip>
  );
};

export default PartyQuestTooltip;
