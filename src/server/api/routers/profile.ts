import { wowPrefernceValidator } from "~/utils/zodValidations";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const profileRouter = createTRPCRouter({
  getUserProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.db.wowPreferences.findUnique({
      where: { userId: ctx.session.user.id },
      include: { classPreferences: true },
    });
  }),

  getSignedUpUsers: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const take = input.limit ? input.limit + 1 : 50;
      const items = await ctx.db.wowPreferences.findMany({
        take,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          id: "asc",
        },
        include: {
          User: { select: { name: true, image: true } },
          classPreferences: true,
        },
      });
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.length > take - 1) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
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
            factionPreferance: input.factionPreferance,
            sodLikelyToPlay: input.sodLikelyToPlay,
            discordPreferences: input.discordPreferances,
          },
          update: {
            userId: ctx.session.user.id,
            factionPreferance: input.factionPreferance,
            sodLikelyToPlay: input.sodLikelyToPlay,
            discordPreferences: input.discordPreferances,
          },
        });
        //delete old class prefs
        await tx.classPreferences.deleteMany({
          where: {
            wowPreferencesId: wowPref.id,
          },
        });
        //bulk insert
        await tx.classPreferences.createMany({
          data: input.classPrefernces.map((pref) => ({
            ...pref,
            wowPreferencesId: wowPref.id,
          })),
        });
      });
    }),
});
