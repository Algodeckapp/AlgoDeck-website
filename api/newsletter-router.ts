import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { readJson, writeJson, db } from "./lib/json-db.js";

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
      const subscribers = await readJson(db.users); // Reusing users.json for newsletter for now
      const existingIndex = subscribers.findIndex((s: any) => s.email === input.email);

      if (existingIndex !== -1) {
        subscribers[existingIndex] = {
          ...subscribers[existingIndex],
          isActive: true,
          name: input.name || subscribers[existingIndex].name,
          source: input.source || subscribers[existingIndex].source,
          updatedAt: new Date().toISOString()
        };
        await writeJson(db.users, subscribers);
        return { success: true, message: "Welcome back! Your preferences have been updated." };
      }

      subscribers.push({
        ...input,
        isActive: true,
        createdAt: new Date().toISOString(),
      });
      await writeJson(db.users, subscribers);
      return { success: true, message: "Successfully subscribed!" };
    }),

  unsubscribe: publicQuery
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const subscribers = await readJson(db.users);
      const index = subscribers.findIndex((s: any) => s.email === input.email);
      if (index !== -1) {
        subscribers[index].isActive = false;
        await writeJson(db.users, subscribers);
      }
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    return await readJson(db.users);
  }),

  count: adminQuery.query(async () => {
    const subscribers = await readJson(db.users);
    return {
      total: subscribers.length,
      active: subscribers.filter((s: any) => s.isActive).length,
    };
  }),
});
