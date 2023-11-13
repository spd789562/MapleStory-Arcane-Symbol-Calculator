interface Role {
  /** role name ex: general, xenon */
  name: RoleType;
  /** role stat unit, for calcuate stat */
  unit: number;
}

export enum RoleType {
  General = 'general',
  Xenon = 'xenon',
  DemonAvenger = 'demon_avenger',
}

/**
 * RoleMapping
 * @description role information
 */
const RoleMapping: Role[] = [
  {
    name: RoleType.General,
    unit: 100,
  },
  {
    name: RoleType.Xenon,
    unit: 48,
  },
  {
    name: RoleType.DemonAvenger,
    unit: 2100,
  },
];

export default RoleMapping;
