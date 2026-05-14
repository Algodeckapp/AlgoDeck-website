import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { demoRequests } from "../db/schema.js";
import { eq, count, desc, type SQL } from "drizzle-orm";

export const demoRouter = createRouter({
  request: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required").max(255),
        email: z.string().email("Please enter a valid email"),
        company: z.string().max(255).optional(),
        phone: z.string().max(50).optional(),
        traderType: z.string().max(50).optional(),
        preferredDate: z.string().optional(),
        message: z.string().max(5000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(demoRequests).values({
        name: input.name,
        email: input.email,
        company: input.company,
        phone: input.phone,
        traderType: input.traderType,
        preferredDate: input.preferredDate ? new Date(input.preferredDate) : undefined,
        message: input.message,
      });
      return { success: true, id: Number(result[0].insertId) };
    }),

  list: adminQuery
    .input(
      z
        .object({
          status: z.string().optional(),
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const limit = input?.limit ?? 50;
      const offset = input?.offset ?? 0;
      const conditions: SQL[] = [];

      if (input?.status) {
        conditions.push(eq(demoRequests.status, input.status as "pending" | "scheduled" | "completed" | "cancelled"));
      }

      return db
        .select()
        .from(demoRequests)
        .where(conditions.length > 0 ? conditions[0] : undefined)
        .orderBy(desc(demoRequests.createdAt))
        .limit(limit)
        .offset(offset);
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "scheduled", "completed", "cancelled"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(demoRequests)
        .set({ status: input.status })
        .where(eq(demoRequests.id, input.id));
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const db = getDb();
    const totalResult = await db.select({ value: count() }).from(demoRequests);
    const pendingResult = await db
      .select({ value: count() })
      .from(demoRequests)
      .where(eq(demoRequests.status, "pending"));
    const scheduledResult = await db
      .select({ value: count() })
      .from(demoRequests)
      .where(eq(demoRequests.status, "scheduled"));
    const completedResult = await db
      .select({ value: count() })
      .from(demoRequests)
      .where(eq(demoRequests.status, "completed"));
    return {
      total: totalResult[0].value,
      pending: pendingResult[0].value,
      scheduled: scheduledResult[0].value,
      completed: completedResult[0].value,
    };
  }),
});
