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
  ["Discord_Role", "I just want to see the channel"],
  ["All_Notifications", "All notifications"],
  ["Server_Faction", "What server/faction we are playing on"],
  ["LFG_Dungeon", "LFG for dungions/raids"],
]) as ReadonlyMap<DiscordPrefernceKeyType, string>;

export const DiscordPrefernceKeys = [
  "Discord_Role",
  "All_Notifications",
  "Server_Faction",
  "LFG_Dungeon",
] as const;

export type DiscordPrefernceKeyType = (typeof DiscordPrefernceKeys)[number];
