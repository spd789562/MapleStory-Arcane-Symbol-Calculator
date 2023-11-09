'use client';
import { useTranslations } from 'next-intl';

import Tooltip from 'antd/lib/tooltip';

interface DailyQuestTooltipProps {
  extraRegion?: string;
  count: number | number[];
  children: React.ReactNode;
}
const DailyQuestTooltip: React.FC<DailyQuestTooltipProps> = ({ extraRegion, count, children }) => {
  const t = useTranslations();
  const firstCount = typeof count === 'number' ? count : count[0];
  const extraCount = typeof count === 'number' ? 0 : count[1];
  return (
    <Tooltip
      title={`${t('daily_quest_tips', { count: firstCount })}${
        extraRegion
          ? t('daily_quest_tips_extra', {
              region: t(extraRegion as keyof IntlMessages),
              count: extraCount,
            })
          : ''
      }`}
    >
      {children}
    </Tooltip>
  );
};

export default DailyQuestTooltip;
