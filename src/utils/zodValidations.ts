import { z } from "zod";
import { ClassList, RoleList } from "../constants/logicConstants";

export const ClassPreferenceValidator = z.object({
  classPreferances: z
    .object({
      id: z.string().cuid().optional(),
      roles: z.enum(RoleList).array(),
      className: z.enum(ClassList),
      wowPreferencesId: z.string().cuid(),
      rank: z
        .number()
        .int()
        .refine((rank) => rank > 0),
    })
    .array(),
});
