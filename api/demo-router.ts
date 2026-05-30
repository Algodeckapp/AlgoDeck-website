import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { readJson, writeJson, db } from "./lib/json-db.js";

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
      const requests = await readJson(db.submissions); // Using submissions.json or creating a new one
      const newRequest = {
        id: Date.now(),
        ...input,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      requests.push(newRequest);
      await writeJson(db.submissions, requests);
      return { success: true, id: newRequest.id };
    }),

  list: adminQuery
    .input(z.object({ limit: z.number().default(50) }).optional())
    .query(async ({ input }) => {
      const requests = await readJson(db.submissions);
      return requests.filter((r: any) => r.traderType).reverse().slice(0, input?.limit ?? 50);
    }),

  updateStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(['pending', 'scheduled', 'completed', 'cancelled']) }))
    .mutation(async ({ input }) => {
      const requests = await readJson(db.submissions);
      const index = requests.findIndex((r: any) => r.id === input.id);
      if (index !== -1) {
        requests[index].status = input.status;
        await writeJson(db.submissions, requests);
      }
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const requests = await readJson(db.submissions);
    const demoRequests = requests.filter((r: any) => r.traderType);
    return {
      total: demoRequests.length,
      pending: demoRequests.filter((r: any) => r.status === 'pending').length,
    };
  }),
});
