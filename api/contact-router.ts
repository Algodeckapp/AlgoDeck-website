import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { db } from "./lib/db.js";
import { sql } from "drizzle-orm";
import { sendEmail } from "./lib/email.js";

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
      await db.execute(sql`
        INSERT INTO contact_submissions (name, email, company, subject, message, status)
        VALUES (${input.name}, ${input.email}, ${input.company || ''}, ${input.subject}, ${input.message}, 'new')
      `);

      await sendEmail(
        input.email,
        `Re: ${input.subject} - AlgoDeck Support`,
        `<p>Hi ${input.name},</p><p>Thanks for reaching out! We have received your message and a member of our team will get back to you shortly.</p>`
      );
      return { success: true };
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
      return await db.execute(sql`SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT ${input?.limit ?? 50} OFFSET ${input?.offset ?? 0}`);
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "in_progress", "resolved"]),
      })
    )
    .mutation(async ({ input }) => {
      await db.execute(sql`UPDATE contact_submissions SET status = ${input.status} WHERE id = ${input.id}`);
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const total = await db.execute(sql`SELECT COUNT(*) FROM contact_submissions`);
    const newCount = await db.execute(sql`SELECT COUNT(*) FROM contact_submissions WHERE status = 'new'`);
    const inProgress = await db.execute(sql`SELECT COUNT(*) FROM contact_submissions WHERE status = 'in_progress'`);
    const resolved = await db.execute(sql`SELECT COUNT(*) FROM contact_submissions WHERE status = 'resolved'`);
    
    return {
      total: Number(total[0].count),
      new: Number(newCount[0].count),
      inProgress: Number(inProgress[0].count),
      resolved: Number(resolved[0].count),
    };
  }),
});
