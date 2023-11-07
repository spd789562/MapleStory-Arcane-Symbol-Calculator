import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import I18nTooltip from '@/components/I18nTooltip';
import FormItem from '@/components/Form/FormItem';
import ResetDaySelect from '@/components/Setting/ResetDaySelect';
import WeeklyIsDoneSwitch from '@/components/Setting/WeeklyIsDoneSwitch';

const Setting = () => {
  return (
    <Row gutter={[8, 0]}>
      <Col span={24} sm={8} md={6} xl={4}>
        <I18nTooltip id="setting_reset_day_tips">
          <FormItem name="resetDay" id="setting_reset_day_title">
            <ResetDaySelect />
          </FormItem>
        </I18nTooltip>
      </Col>
      <Col span={24} sm={12} md={6} xl={8}>
        <I18nTooltip id="setting_weeklyIsDone_tips">
          <FormItem name="currentWeekIsDone" id="setting_weeklyIsDone_title">
            <WeeklyIsDoneSwitch />
          </FormItem>
        </I18nTooltip>
      </Col>
    </Row>
  );
};

export default Setting;
