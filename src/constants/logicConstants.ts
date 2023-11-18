export const RoleList = ["Tank", "Healer", "DPS"] as const;
export type Role = (typeof RoleList)[number];
export const ClassList = [
  "Druid",
  "Hunter",
  "Mage",
  "Paladin",
  "Priest",
  "Rogue",
  "Shaman",
  "Warlock",
  "Warrior",
] as const;
export type ClassName = (typeof ClassList)[number];
