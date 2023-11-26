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

export const DiscordPrefernces = new Map<DiscordPrefernceKeyType, string>([
  ["Discord_Role", "Don't notify me, but let me see the WoW channel"],
  ["Server_Faction", "Notifiy me when a sever and faction is picked"],
  ["LFG_Dungeon", "Notify me when people are LFM for dungions/raids"],
]) as ReadonlyMap<DiscordPrefernceKeyType, string>;

export const DiscordPrefernceKeys = [
  "Discord_Role",
  "Server_Faction",
  "LFG_Dungeon",
] as const;

export type DiscordPrefernceKeyType = (typeof DiscordPrefernceKeys)[number];
