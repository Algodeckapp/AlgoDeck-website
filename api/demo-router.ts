import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { sendEmail } from "./lib/email.js";
import { kv } from "./lib/db.js";
import { templates } from "./lib/email-templates.js";

export const demoRouter = createRouter({
  request: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        company: z.string().optional(),
        phone: z.string().optional(),
        traderType: z.string().default('individual'),
        preferredDate: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Save to KV
      try {
        const requests = (await kv.get<any[]>("demo_requests")) || [];
        const newRequest = {
          id: Date.now(),
          ...input,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        requests.push(newRequest);
        await kv.set("demo_requests", requests);
      } catch (error) {
        console.error("[Demo] Save failed:", error);
      }

      // 2. Send confirmation to user
      await sendEmail(
        input.email,
        "Demo Request Confirmed",
        templates.demoUser(input.name)
      );

      // 3. Send notification to admin
      await sendEmail(
        "admin@algodeck.app",
        `NEW DEMO REQUEST: ${input.name}`,
        templates.adminNotification("New Demo Request", [
          { label: "Name", value: input.name },
          { label: "Email", value: input.email },
          { label: "Company", value: input.company || "N/A" },
          { label: "Phone", value: input.phone || "N/A" },
          { label: "Trader Type", value: input.traderType },
          { label: "Preferred Date", value: input.preferredDate || "N/A" },
          { label: "Message", value: input.message || "N/A" },
        ])
      );

      return { success: true, id: Date.now() };
    }),
...

  list: adminQuery
    .input(z.object({ limit: z.number().default(50) }).optional())
    .query(async ({ input }) => {
      const requests = (await kv.get<any[]>("demo_requests")) || [];
      return requests.reverse().slice(0, input?.limit ?? 50);
    }),

  updateStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(['pending', 'scheduled', 'completed', 'cancelled']) }))
    .mutation(async ({ input }) => {
      const requests = (await kv.get<any[]>("demo_requests")) || [];
      const index = requests.findIndex((r: any) => r.id === input.id);
      if (index !== -1) {
        requests[index].status = input.status;
        await kv.set("demo_requests", requests);
      }
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const requests = (await kv.get<any[]>("demo_requests")) || [];
    return {
      total: requests.length,
      pending: requests.filter((r: any) => r.status === 'pending').length,
    };
  }),
});
