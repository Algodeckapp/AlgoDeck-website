import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { db } from "./lib/db.js";
import { sql } from "drizzle-orm";

export const newsletterRouter = createRouter({
  subscribe: publicQuery
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await db.execute(sql`
        INSERT INTO newsletter_subscribers (email, name, source, is_active)
        VALUES (${input.email}, ${input.name || ''}, ${input.source || 'website'}, true)
        ON CONFLICT (email) DO UPDATE SET 
        is_active = true, 
        name = EXCLUDED.name,
        source = EXCLUDED.source
      `);
      return { success: true, message: "Successfully subscribed!" };
    }),

  unsubscribe: publicQuery
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      await db.execute(sql`
        UPDATE newsletter_subscribers SET is_active = false WHERE email = ${input.email}
      `);
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    return await db.execute(sql`SELECT * FROM newsletter_subscribers ORDER BY created_at`);
  }),

  count: adminQuery.query(async () => {
    const total = await db.execute(sql`SELECT COUNT(*) FROM newsletter_subscribers`);
    const active = await db.execute(sql`SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = true`);
    return {
      total: Number(total[0].count),
      active: Number(active[0].count),
    };
  }),
});
