'use client';
import { atom, useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import { symbolTypeAtom } from '@/store/tab';
import { symbolsAtom } from '@/store/symbols';
import { currentWeekIsDoneAtom, resetDayAtom } from '@/store/settings';
import { forceProgressSelector } from '@/store/selector';

import Statistic from 'antd/lib/statistic/Statistic';
import Tooltip from 'antd/lib/tooltip';

import {
  calcToTargetLevelData,
  getDailyQuestCount,
  getPartyQuestCountByType,
} from '@/util/calcToTargetLevelData';

import SymbolRegion from '@/mapping/region';
import SymbolInfo from '@/mapping/force';

import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import numberFormat from '@/util/numberFormat';

dayjs.extend(isSameOrAfter);

const completeDateSelector = atom((get) => {
  const currentWeekIsDone = get(currentWeekIsDoneAtom);
  const resetDay = get(resetDayAtom);
  const symbolType = get(symbolTypeAtom);
  const symbols = get(symbolsAtom);

  if (!symbolType) {
    return {
      remainDays: 0,
      excludeName: [] as string[],
      completeDate: '',
      latestName: '',
    };
  }

  const statisticData = SymbolRegion[symbolType]
    .map((regionData) => ({
      ...regionData,
      currentCount: symbols[regionData.key].count || 0,
      dailyQuest: symbols[regionData.key].quest || false,
      dailyParty: symbols[regionData.key].party || false,
    }))
    .filter(({ currentCount }) => currentCount > 0)
    .map(
      ({ name, key, daily, pquest, currentCount, dailyQuest, dailyParty }) => {
        const dailyQuestCount = getDailyQuestCount(daily, dailyQuest);
        const dailyPartyQuestCount = getPartyQuestCountByType(
          pquest,
          dailyParty,
          'daily',
        );
        const weeklyPartyQuestCount = getPartyQuestCountByType(
          pquest,
          dailyParty,
          'weekly',
        );

        const dailyTotalCount = dailyQuestCount + dailyPartyQuestCount;
        const { completeDate, remainDays } = calcToTargetLevelData({
          region: symbolType,
          currentWeekIsDone,
          key,
          level: SymbolInfo[symbolType].symbol.maxLevel,
          currentCount,
          dailyTotalCount,
          weekResetDay: resetDay,
          weeklyCount: weeklyPartyQuestCount,
        });
        return {
          name,
          completeDate,
          remainDays,
        };
      },
    )
    .reduce(
      (acc, inc) => {
        if (dayjs(inc.completeDate).isValid()) {
          if (
            !acc.completeDate ||
            dayjs(inc.completeDate).isSameOrAfter(acc.completeDate, 'days')
          ) {
            acc.completeDate = inc.completeDate;
            acc.latestName = inc.name;
          }
        } else {
          acc.excludeName.push(inc.name);
        }
        acc.remainDays =
          inc.remainDays !== Infinity && inc.remainDays > acc.remainDays
            ? inc.remainDays
            : acc.remainDays;
        return acc;
      },
      {
        completeDate: dayjs().format('YYYY-MM-DD'),
        remainDays: 0,
        excludeName: [] as string[],
        latestName: '',
      },
    );

  return statisticData;
});

const CompleteDate: React.FC = () => {
  const t = useTranslations();
  const { remainDays, excludeName, completeDate, latestName } =
    useAtomValue(completeDateSelector);
  const { currentForce, availableForce, levelTotal } = useAtomValue(
    forceProgressSelector,
  );
  const isComplete = currentForce === availableForce;

  const completeDateText = levelTotal
    ? remainDays === 0
      ? isComplete
        ? t('complete_date_complete')
        : t('complete_date_never')
      : completeDate
    : t('complete_date_none');
  const excludeTooltips =
    t('complete_date_tips_last', {
      area: latestName && t(latestName as keyof IntlMessages),
    }) +
    (excludeName.length
      ? t('comma') +
        t('complete_date_tips', {
          areas: (excludeName as (keyof IntlMessages)[])
            .map((name) => t(name))
            .join(', '),
        })
      : '');

  return (
    <Statistic
      title={
        <Tooltip title={remainDays ? excludeTooltips : completeDateText}>
          {t('all_complete_date')}
        </Tooltip>
      }
      value={completeDateText}
      suffix={
        remainDays ? `(${numberFormat(remainDays)}${t('complete_days')})` : ''
      }
    />
  );
};

export default CompleteDate;
