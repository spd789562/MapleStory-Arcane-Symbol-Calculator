'use client';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { roleAtom } from '@/store/settings';

import Select from 'antd/lib/select';

import RoleMapping from '@/mapping/role';

import { evolve } from 'ramda';

const RoleOption = RoleMapping.map((role, index) => ({
  label: role.name,
  value: index,
}));

const RoleSelect: React.FC = () => {
  const [role, setRole] = useAtom(roleAtom);
  const t = useTranslations();

  const handleChange = (value: number | null) => {
    setRole(value ?? 0);
  };

  return (
    <Select
      value={role}
      onChange={handleChange}
      options={RoleOption.map(evolve({ label: t }))}
    />
  );
};

export default RoleSelect;
