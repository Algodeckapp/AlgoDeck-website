import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { redis } from "./lib/db.js";

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
      const subscribers = (await redis.get<any[]>("newsletter_subscribers")) || [];
      const existingIndex = subscribers.findIndex((s: any) => s.email === input.email);

      if (existingIndex !== -1) {
        subscribers[existingIndex] = {
          ...subscribers[existingIndex],
          isActive: true,
          name: input.name || subscribers[existingIndex].name,
          source: input.source || subscribers[existingIndex].source,
          updatedAt: new Date().toISOString()
        };
        await redis.set("newsletter_subscribers", subscribers);
        return { success: true, message: "Welcome back! Your preferences have been updated." };
      }

      subscribers.push({
        ...input,
        isActive: true,
        createdAt: new Date().toISOString(),
      });
      await redis.set("newsletter_subscribers", subscribers);
      return { success: true, message: "Successfully subscribed!" };
    }),

  unsubscribe: publicQuery
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const subscribers = (await redis.get<any[]>("newsletter_subscribers")) || [];
      const index = subscribers.findIndex((s: any) => s.email === input.email);
      if (index !== -1) {
        subscribers[index].isActive = false;
        await redis.set("newsletter_subscribers", subscribers);
      }
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    return (await redis.get<any[]>("newsletter_subscribers")) || [];
  }),

  count: adminQuery.query(async () => {
    const subscribers = (await redis.get<any[]>("newsletter_subscribers")) || [];
    return {
      total: subscribers.length,
      active: subscribers.filter((s: any) => s.isActive).length,
    };
  }),
});
