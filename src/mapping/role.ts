interface Role {
  /** role name ex: general, xenon */
  name: string;
  /** role stat unit, for calcuate stat */
  unit: number;
}

/**
 * RoleMapping
 * @description role information
 */
const RoleMapping: Role[] = [
  {
    name: 'general',
    unit: 100,
  },
  {
    name: 'xenon',
    unit: 48,
  },
  {
    name: 'demon_avenger',
    unit: 2100,
  },
];

export default RoleMapping;
