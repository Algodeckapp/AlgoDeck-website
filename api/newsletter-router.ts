import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { sendEmail } from "./lib/email.js";
import { kv } from "./lib/db.js";
import { templates } from "./lib/email-templates.js";

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
      // 1. Save to KV
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

      // 2. Send confirmation to user
      await sendEmail(
        input.email,
        "Welcome to AlgoDeck",
        templates.newsletterUser(input.email)
      );

      // 3. Send notification to admin
      await sendEmail(
        "admin@algodeck.app",
        `NEW SUBSCRIBER: ${input.email}`,
        templates.adminNotification("New Newsletter Subscriber", [
          { label: "Email", value: input.email },
          { label: "Name", value: input.name || "N/A" },
          { label: "Source", value: input.source || "N/A" },
        ])
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
