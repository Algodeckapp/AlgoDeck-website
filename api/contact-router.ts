import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { readJson, writeJson, db } from "./lib/json-db.js";

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
      const submissions = await readJson(db.submissions);
      const newSubmission = {
        id: Date.now(),
        ...input,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      submissions.push(newSubmission);
      await writeJson(db.submissions, submissions);
      return { success: true, id: newSubmission.id };
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
      let submissions = await readJson(db.submissions);
      if (input?.status) {
        submissions = submissions.filter((s: any) => s.status === input.status);
      }
      return submissions.reverse().slice(input?.offset ?? 0, (input?.offset ?? 0) + (input?.limit ?? 50));
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "in_progress", "resolved"]),
      })
    )
    .mutation(async ({ input }) => {
      const submissions = await readJson(db.submissions);
      const index = submissions.findIndex((s: any) => s.id === input.id);
      if (index !== -1) {
        submissions[index].status = input.status;
        await writeJson(db.submissions, submissions);
      }
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const submissions = await readJson(db.submissions);
    return {
      total: submissions.length,
      new: submissions.filter((s: any) => s.status === 'new').length,
      inProgress: submissions.filter((s: any) => s.status === 'in_progress').length,
      resolved: submissions.filter((s: any) => s.status === 'resolved').length,
    };
  }),
});
