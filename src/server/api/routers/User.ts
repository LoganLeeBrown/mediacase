import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserCountById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.count({
        where: { id: input.id },
      });
    }),

  createUser: privateProcedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx }) => {
      const authorId = ctx.userId;

      const user = await ctx.prisma.user.create({
        data: {
          id: authorId,
        },
      });

      return user;
    }),
});
