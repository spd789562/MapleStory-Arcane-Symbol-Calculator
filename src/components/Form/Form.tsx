'use client';
/* try to import css */
import styleRegister from 'antd/lib/form/style';

export const FormStyle = () => {
  const [wrapSSR, hashId] = styleRegister('antd-form');
  return wrapSSR(null);
};

export default function Form({ children }: { children?: React.ReactNode }) {
  const [wrapSSR, hashId] = styleRegister('antd-form');
  return wrapSSR(<div className="antd-form-horizontal antd-form">{children}</div>);
}
