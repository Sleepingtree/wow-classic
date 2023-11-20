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
      return ctx.db.wowPreferences.upsert({
        where: { id: input.id },
        create: {
          userId: ctx.session.user.id,
          classPreferences: {
            createMany: {
              data: input.classPrefernces,
            },
          },
        },
        update: input,
      });
      // return ctx.db.wowPreferences.create({
      //   data: {
      //     classPreferences: {
      //       createMany: { data: input.classPrefernces },
      //     },
      //     userId: ctx.session.user.id,
      //   },
      // });
    }),
});
