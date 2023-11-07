import Row from 'antd/lib/row';
import Col, { ColProps } from 'antd/lib/col';
import FormLabel from './FormLabel';

export interface FormItemProps {
  name: string;
  /** label i18n key */
  id?: keyof IntlMessages;
  /** label fallback when no i18n key */
  label?: React.ReactNode;
  wrapperCol?: ColProps;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  withColon?: boolean;
}
const FormItem = ({ name, id, label, wrapperCol, style, withColon, children }: FormItemProps) => {
  return (
    <Row className="ant-form-item" style={style}>
      <Col className="ant-form-item-label" {...wrapperCol}>
        <FormLabel name={name} id={id} label={label} withColon={withColon} />
      </Col>
      <Col className="ant-form-item-control" {...wrapperCol}>
        <div className="ant-form-item-control-input">
          <div className="ant-form-item-control-input-content">{children}</div>
        </div>
      </Col>
    </Row>
  );
};

export default FormItem;
