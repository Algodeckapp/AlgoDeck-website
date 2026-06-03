import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { sendEmail } from "./lib/email.js";
import { kv } from "./lib/db.js";

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
      // 1. Save to KV (Redis in Prod, JSON in Local)
      try {
        const subscribers = (await kv.get<any[]>("newsletter_subscribers")) || [];
        const existingIndex = subscribers.findIndex((s: any) => s.email === input.email);

        if (existingIndex !== -1) {
          subscribers[existingIndex] = {
            ...subscribers[existingIndex],
            isActive: true,
            name: input.name || subscribers[existingIndex].name,
            source: input.source || subscribers[existingIndex].source,
            updatedAt: new Date().toISOString()
          };
        } else {
          subscribers.push({
            ...input,
            isActive: true,
            createdAt: new Date().toISOString(),
          });
        }
        await kv.set("newsletter_subscribers", subscribers);
      } catch (error) {
        console.error("[Newsletter] Save failed:", error);
      }

      // 2. Send notification to admin
      await sendEmail(
        "admin@algodeck.app",
        `NEW SUBSCRIBER: ${input.email}`,
        `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${input.email}</p>
        <p><strong>Name:</strong> ${input.name || 'N/A'}</p>
        <p><strong>Source:</strong> ${input.source || 'N/A'}</p>
        `
      );

      return { success: true, message: "Successfully subscribed!" };
    }),

  unsubscribe: publicQuery
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const subscribers = (await kv.get<any[]>("newsletter_subscribers")) || [];
      const index = subscribers.findIndex((s: any) => s.email === input.email);
      if (index !== -1) {
        subscribers[index].isActive = false;
        await kv.set("newsletter_subscribers", subscribers);
      }
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    return (await kv.get<any[]>("newsletter_subscribers")) || [];
  }),

  count: adminQuery.query(async () => {
    const subscribers = (await kv.get<any[]>("newsletter_subscribers")) || [];
    return {
      total: subscribers.length,
      active: subscribers.filter((s: any) => s.isActive).length,
    };
  }),
});
