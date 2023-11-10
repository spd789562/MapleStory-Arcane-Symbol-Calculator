import SymbolRegionInfo, {
  SymbolType,
  ArcaneSymbolType,
  GrandisSymbolType,
} from '@/mapping/region';
import SymbolLevelInfo from '@/mapping/symbol';

import symbolMatch from './symbol-match';
import numberFormat from './numberFormat';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { propEq } from 'ramda';

dayjs.extend(isoWeek);

interface CalcToTargetLevelDataParam {
  region: SymbolType;
  key: ArcaneSymbolType | GrandisSymbolType;
  /** target symbol level */
  level: number;
  /** current symbol exp */
  currentCount: number;
  /** symbol daily rewarded */
  dailyTotalCount: number;
  /** symbol weelky rewarded */
  weeklyCount: number;
  /** symbol reset day */
  weekResetDay: number;
  /** current weekly quest is clear */
  currentWeekIsDone: boolean;
}

interface ToTargetLevelData {
  key: ArcaneSymbolType | GrandisSymbolType;
  /** target symbol level */
  level: number;
  /** target symbol complete date */
  completeDate: string;
  /** remain days to complete target symbol level */
  remainDays: number;
  /** current symbol level */
  currentLevel: number;
  /** remain symbol exp to target */
  accumulativeNeed: number;
  /** mesos cost from current level to target level */
  totalCost: string;
}

function calcToTargetLevelData({
  region,
  key,
  level,
  currentCount,
  dailyTotalCount,
  weeklyCount = 0,
  weekResetDay = 3,
  currentWeekIsDone = false,
}: CalcToTargetLevelDataParam): ToTargetLevelData {
  const RegionSymbolMapping = SymbolLevelInfo[region];
  const CurrentRegionMapping = SymbolRegionInfo[region];
  const TargetArcane = RegionSymbolMapping[level];
  const currentArcane = symbolMatch(region, currentCount);
  const remainSymbolCount = TargetArcane.stack - currentCount;
  let remainDays = 0; // Math.ceil(remainSymbolCount / dailyTotalCount)

  const weeklyDailyCount = dailyTotalCount * 7;
  const totalWeeklyCount = weeklyCount + weeklyDailyCount;

  const currentDay = dayjs().isoWeekday();

  // get next reset date base on week, if current day is reset day, then add 1 week
  const resetDate = (
    currentDay >= weekResetDay
      ? dayjs().add(1, 'weeks').isoWeekday(weekResetDay).startOf('day')
      : dayjs().isoWeekday(weekResetDay)
  ).startOf('day');

  const beforeResetDatesDate = resetDate.diff(dayjs(), 'days');

  const _weekCount = currentWeekIsDone ? 0 : weeklyCount;
  // get total symbols will able to get before reset date
  const beforeResetDateCount =
    beforeResetDatesDate * dailyTotalCount + _weekCount;

  // can done in this week
  if (remainSymbolCount <= beforeResetDateCount) {
    // get total days will able to get before reset date
    remainDays =
      remainSymbolCount <= _weekCount
        ? 0
        : Math.ceil((remainSymbolCount - _weekCount) / dailyTotalCount);
  } else {
    // calculate from reset date
    const _remainCount = remainSymbolCount - beforeResetDateCount;

    // get total full weeks
    const needWeek = Math.floor(_remainCount / totalWeeklyCount);
    const resetWeekCount = _remainCount % totalWeeklyCount;

    const resetDayInWeek = resetWeekCount
      ? resetWeekCount < weeklyCount + dailyTotalCount
        ? 1
        : Math.ceil((resetWeekCount - weeklyCount) / dailyTotalCount)
      : 0;
    remainDays = needWeek * 7 + resetDayInWeek + beforeResetDatesDate;
  }

  /* calculate mesos cost from current level to target level */
  const costFormula = CurrentRegionMapping.find(
    propEq(key, 'key'),
  )!.costFormula;
  const totalCost = RegionSymbolMapping.reduce(
    (totalCost, { level: arcaneLevel }) => {
      totalCost +=
        arcaneLevel >= currentArcane.level && arcaneLevel <= level - 1
          ? costFormula(arcaneLevel)
          : 0;
      return totalCost;
    },
    0,
  );
  const completeDate = dayjs().add(remainDays, 'days').format('YYYY-MM-DD');
  return {
    key,
    level,
    completeDate,
    currentLevel: currentArcane.level,
    remainDays,
    accumulativeNeed: remainSymbolCount,
    totalCost: numberFormat(totalCost),
  };
}

export default calcToTargetLevelData;
