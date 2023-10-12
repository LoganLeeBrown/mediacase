import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const listRouter = createTRPCRouter({
  getByOwnerId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const lists = await ctx.prisma.list.findMany({
        where: { ownerId: input.id },
        take: 100,
        orderBy: [{ createdAt: "asc" }],
      });

      return lists;
    }),
});
