import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { db } from "./lib/db.js";
import { sql } from "drizzle-orm";

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
      await db.execute(sql`
        INSERT INTO demo_requests (name, email, company, phone, trader_type, preferred_date, message, status)
        VALUES (${input.name}, ${input.email}, ${input.company || ''}, ${input.phone || ''}, ${input.traderType}, ${input.preferredDate || null}, ${input.message || ''}, 'pending')
      `);
      return { success: true };
    }),

  list: adminQuery
    .input(z.object({ limit: z.number().default(50) }).optional())
    .query(async ({ input }) => {
      return await db.execute(sql`SELECT * FROM demo_requests ORDER BY created_at DESC LIMIT ${input?.limit ?? 50}`);
    }),

  updateStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(['pending', 'scheduled', 'completed', 'cancelled']) }))
    .mutation(async ({ input }) => {
      await db.execute(sql`UPDATE demo_requests SET status = ${input.status} WHERE id = ${input.id}`);
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const total = await db.execute(sql`SELECT COUNT(*) FROM demo_requests`);
    const pending = await db.execute(sql`SELECT COUNT(*) FROM demo_requests WHERE status = 'pending'`);
    return {
      total: Number(total[0].count),
      pending: Number(pending[0].count),
    };
  }),
});
