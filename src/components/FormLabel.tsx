'use client';
import { useTranslations } from 'next-intl';

interface FormLabelProps {
  name: string;
  id?: keyof IntlMessages;
  label?: React.ReactNode;
  className?: string;
  withColon?: boolean;
}
export default function FormLabel({ name, id, label, className = '', withColon = true }: FormLabelProps) {
  const t = useTranslations();
  const text = (id && t(id)) || label;
  const title = typeof text === 'string' ? text : undefined;
  return (
    <label className={`${withColon ? '' : 'ant-form-item-no-colon '}${className}`} htmlFor={name} title={title}>
      {text}
    </label>
  );
}
