import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contactSubmissions } from "../db/schema";
import { eq, count, desc, type SQL } from "drizzle-orm";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required").max(255),
        email: z.string().email("Please enter a valid email"),
        company: z.string().max(255).optional(),
        subject: z.string().min(1, "Subject is required").max(100),
        message: z.string().min(10, "Message must be at least 10 characters").max(5000),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contactSubmissions).values({
        name: input.name,
        email: input.email,
        company: input.company,
        subject: input.subject,
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
        conditions.push(eq(contactSubmissions.status, input.status as "new" | "in_progress" | "resolved"));
      }

      return db
        .select()
        .from(contactSubmissions)
        .where(conditions.length > 0 ? conditions[0] : undefined)
        .orderBy(desc(contactSubmissions.createdAt))
        .limit(limit)
        .offset(offset);
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "in_progress", "resolved"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(contactSubmissions)
        .set({ status: input.status })
        .where(eq(contactSubmissions.id, input.id));
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const db = getDb();
    const totalResult = await db.select({ value: count() }).from(contactSubmissions);
    const newResult = await db
      .select({ value: count() })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "new"));
    const inProgressResult = await db
      .select({ value: count() })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "in_progress"));
    const resolvedResult = await db
      .select({ value: count() })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "resolved"));
    return {
      total: totalResult[0].value,
      new: newResult[0].value,
      inProgress: inProgressResult[0].value,
      resolved: resolvedResult[0].value,
    };
  }),
});
