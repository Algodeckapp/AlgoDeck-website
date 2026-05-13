import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { newsletterSubscribers } from "../db/schema";
import { eq, count } from "drizzle-orm";

export const newsletterRouter = createRouter({
  subscribe: publicQuery
    .input(
      z.object({
        email: z.string().email("Please enter a valid email address"),
        name: z.string().optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if already subscribed
      const existing = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, input.email))
        .limit(1);

      if (existing.length > 0) {
        // Update existing record
        await db
          .update(newsletterSubscribers)
          .set({ 
            isActive: true, 
            name: input.name || existing[0].name,
            source: input.source || existing[0].source
          })
          .where(eq(newsletterSubscribers.email, input.email));
        return { success: true, message: "Welcome back! Your preferences have been updated." };
      }

      await db.insert(newsletterSubscribers).values({
        email: input.email,
        name: input.name,
        source: input.source || "website",
      });

      return { success: true, message: "Successfully subscribed!" };
    }),

  unsubscribe: publicQuery
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(newsletterSubscribers)
        .set({ isActive: false })
        .where(eq(newsletterSubscribers.email, input.email));
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(newsletterSubscribers).orderBy(newsletterSubscribers.createdAt);
  }),

  count: adminQuery.query(async () => {
    const db = getDb();
    const totalResult = await db.select({ value: count() }).from(newsletterSubscribers);
    const activeResult = await db
      .select({ value: count() })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.isActive, true));
    return {
      total: totalResult[0].value,
      active: activeResult[0].value,
    };
  }),
});
