import { z } from "zod";
import { ClassList, RoleList } from "../constants/logicConstants";

export const classPreferenceValidator = z.object({
  id: z.string().cuid().optional(),
  roles: z.enum(RoleList).array().min(1),
  className: z.enum(ClassList),
  wowPreferencesId: z.string().cuid().optional(),
  rank: z
    .number()
    .int()
    .refine((rank) => rank > 0, { message: "Ranks must be positive" }),
});

export const wowPrefernceValidator = z.object({
  id: z.string().cuid().optional(),
  classPrefernces: classPreferenceValidator.array().min(1),
});
