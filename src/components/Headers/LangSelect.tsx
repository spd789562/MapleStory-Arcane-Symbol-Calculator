'use client';
import { useRouter, usePathname } from 'next-intl/client';
import { useLocale } from 'next-intl';

import Select from 'antd/lib/select';

const langOptions = [
  { value: 'en', label: 'English' },
  { value: 'zh-tw', label: '繁體中文' },
  { value: 'zh-cn', label: '简体中文' },
];

const LangSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  return <Select defaultValue={currentLocale} onChange={handleChange} options={langOptions} />;
};

export default LangSelect;
