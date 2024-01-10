import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';

import ForceProgress from './ForceProgess';
import RoleStat from './RoleStat';
import RoleSelect from './RoleSelect';
import SkillInputs from './SkillsInputs';
import CompleteDate from './CompleteDate';

function StatisticBoard() {
  return (
    <Row gutter={[8, 8]} className="py-2">
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Row>
            <Col span={12}>
              <ForceProgress />
            </Col>
            <Col span={12}>
              <SkillInputs />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Row>
            <Col span={12}>
              <RoleStat />
            </Col>
            <Col span={12}>
              <RoleSelect />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <CompleteDate />
        </Card>
      </Col>
    </Row>
  );
}

export default StatisticBoard;
