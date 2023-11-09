import Row from 'antd/lib/row';
import Col, { ColProps } from 'antd/lib/col';
import FormLabel from './FormLabel';

export interface FormItemProps {
  name: string;
  className?: string;
  /** label i18n key */
  id?: keyof IntlMessages;
  /** label fallback when no i18n key */
  label?: React.ReactNode;
  wrapperCol?: ColProps;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** need colon in the end of label */
  withColon?: boolean;
}
const FormItem = ({ name, className, id, label, wrapperCol, style, withColon, children }: FormItemProps) => {
  return (
    <Row className={`antd-form-item ${className}`} style={style}>
      <Col className="antd-form-item-label" {...wrapperCol}>
        <FormLabel name={name} id={id} label={label} withColon={withColon} />
      </Col>
      <Col className="antd-form-item-control" {...wrapperCol}>
        <div className="antd-form-item-control-input">
          <div className="antd-form-item-control-input-content">{children}</div>
        </div>
      </Col>
    </Row>
  );
};

export default FormItem;
