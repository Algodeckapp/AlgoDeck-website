import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { redis } from "./lib/db.js";

export const demoRouter = createRouter({
  request: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        company: z.string().optional(),
        phone: z.string().optional(),
        traderType: z.string().default('individual'),
        preferredDate: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const requests = (await redis.get<any[]>("demo_requests")) || [];
      const newRequest = {
        id: Date.now(),
        ...input,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      requests.push(newRequest);
      await redis.set("demo_requests", requests);
      return { success: true, id: newRequest.id };
    }),

  list: adminQuery
    .input(z.object({ limit: z.number().default(50) }).optional())
    .query(async ({ input }) => {
      const requests = (await redis.get<any[]>("demo_requests")) || [];
      return requests.reverse().slice(0, input?.limit ?? 50);
    }),

  updateStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(['pending', 'scheduled', 'completed', 'cancelled']) }))
    .mutation(async ({ input }) => {
      const requests = (await redis.get<any[]>("demo_requests")) || [];
      const index = requests.findIndex((r: any) => r.id === input.id);
      if (index !== -1) {
        requests[index].status = input.status;
        await redis.set("demo_requests", requests);
      }
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const requests = (await redis.get<any[]>("demo_requests")) || [];
    return {
      total: requests.length,
      pending: requests.filter((r: any) => r.status === 'pending').length,
    };
  }),
});
