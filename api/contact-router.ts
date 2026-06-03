import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { sendEmail } from "./lib/email.js";
import { kv } from "./lib/db.js";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email(),
        company: z.string().max(255).optional(),
        subject: z.string().min(1).max(100),
        message: z.string().min(10).max(5000),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Save to KV (Redis in Prod, JSON in Local)
      try {
        const submissions = (await kv.get<any[]>("contact_submissions")) || [];
        const newSubmission = {
          id: Date.now(),
          ...input,
          status: "new",
          createdAt: new Date().toISOString(),
        };
        await kv.set("contact_submissions", [...submissions, newSubmission]);
      } catch (error) {
        console.error("[Contact] Save failed:", error);
      }

      // 2. Send confirmation to user
      await sendEmail(
        input.email,
        `Re: ${input.subject} - AlgoDeck Support`,
        `<p>Hi ${input.name},</p><p>Thanks for reaching out! We have received your message and a member of our team will get back to you shortly.</p><hr/><p><strong>Your Message:</strong></p><p>${input.message}</p>`
      );

      // 3. Send notification to admin
      await sendEmail(
        "admin@algodeck.app",
        `NEW CONTACT: ${input.subject}`,
        `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${input.name}</p>
        <p><strong>Email:</strong> ${input.email}</p>
        <p><strong>Company:</strong> ${input.company || 'N/A'}</p>
        <p><strong>Subject:</strong> ${input.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${input.message}</p>
        `
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
      let submissions = (await kv.get<any[]>("contact_submissions")) || [];
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
      const submissions = (await kv.get<any[]>("contact_submissions")) || [];
      const index = submissions.findIndex((s: any) => s.id === input.id);
      if (index !== -1) {
        submissions[index].status = input.status;
        await kv.set("contact_submissions", submissions);
      }
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const submissions = (await kv.get<any[]>("contact_submissions")) || [];
    return {
      total: submissions.length,
      new: submissions.filter((s: any) => s.status === "new").length,
      inProgress: submissions.filter((s: any) => s.status === "in_progress").length,
      resolved: submissions.filter((s: any) => s.status === "resolved").length,
    };
  }),
});
