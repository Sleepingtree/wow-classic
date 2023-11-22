import { z } from "zod";
import {
  ClassList,
  DiscordPrefernceKeys,
  RoleList,
} from "../constants/logicConstants";

export const classPreferenceValidator = z.object({
  id: z.string().cuid().optional(),
  roles: z.enum(RoleList).array().min(1),
  className: z.enum(ClassList),
  wowPreferencesId: z.string().cuid().optional(),
  rank: z.number().int().positive(),
});

export const discordPrefence = z.enum(DiscordPrefernceKeys);

export const wowPrefernceValidator = z.object({
  id: z.string().cuid().optional(),
  discordPreferances: discordPrefence.array(),
  sodLikelyToPlay: z.number().int().min(0).max(100),
  classPrefernces: classPreferenceValidator.array().min(1),
});
