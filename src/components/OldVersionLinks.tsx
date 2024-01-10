import Col from 'antd/lib/grid/col';
import Button from 'antd/lib/button';

import I18nText from '@/components/I18nText';

const link_daily = 'https://maplestory-arcane-symbol-calculator-git-reserv-35cbad-spd789562.vercel.app';
const link_before = 'https://maplestory-arcane-symbol-calculator-git-reserv-425b5f-spd789562.vercel.app';

const OldVersionLinks = () => {
  return (
    <Col span={24} className="mb-2">
      <Button href={link_before} target="_blank">
        <I18nText id="web_weekly_party_version" />
        &nbsp;&gt;
      </Button>
      <Button href={link_daily} target="_blank" className="mt-2 sm:mt-0 sm:ml-2">
        <I18nText id="web_daily_party_version" />
        &nbsp;&gt;
      </Button>
    </Col>
  );
};

export default OldVersionLinks;
