import { nullishPredicate } from "~/utils/typeUtil";
import { wowPrefernceValidator } from "~/utils/zodValidations";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getUserProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.db.wowPreferences.findUnique({
      where: { userId: ctx.session.user.id },
      include: { classPreferences: true },
    });
  }),

  updateWowPreferances: protectedProcedure
    .input(wowPrefernceValidator)
    .mutation(({ input, ctx }) => {
      console.log(
        `upserting with input: \r\n${JSON.stringify(
          input,
          null,
          2,
        )} \r\n and userid: ${ctx.session.user.id}`,
      );
      return ctx.db.$transaction(async (tx) => {
        //save wow prefs
        const wowPref = await tx.wowPreferences.upsert({
          where: { userId: ctx.session.user.id },
          create: {
            userId: ctx.session.user.id,
          },
          update: { userId: ctx.session.user.id },
        });
        //delete old class prefs
        const other = await tx.classPreferences.deleteMany({
          where: {
            AND: [
              { wowPreferencesId: input.id },
              {
                id: {
                  notIn: input.classPrefernces
                    .map((pref) => pref.id)
                    .filter(nullishPredicate),
                },
              },
            ],
          },
        });
        //upsert new class prefs
        input.classPrefernces.forEach(async (pref) => {
          console.log(`upserting with pref ${JSON.stringify(pref, null, 2)}`);
          await tx.classPreferences.upsert({
            where: { id: pref.id },
            create: { ...pref, wowPreferencesId: wowPref.id },
            update: pref,
          });
        });
      });
    }),
});
