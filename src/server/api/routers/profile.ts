import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";
import { ClassPreferenceValidator } from "~/utils/zodValidations";

export const profileRouter = createTRPCRouter({
  getUserProfile: protectedProcedure
    .input(z.object({ userId: z.string().cuid() }))
    .query(({ input, ctx }) => {
      return ctx.db.wowPreferences.findUnique({
        where: { userId: input.userId },
        include: { classPreferences: true },
      });
    }),

  updateWowPreferances: protectedProcedure
    .input(ClassPreferenceValidator)
    .mutation(({ input, ctx }) => {
      return input.classPreferances.forEach((pref) => {
        ctx.db.classPreferences.upsert({
          where: { id: pref.id },
          create: { ...pref },
          update: { ...pref },
        });
      });
    }),
});
