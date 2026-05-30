import { authRouter } from "./auth-router.js";
import { newsletterRouter } from "./newsletter-router.js";
import { contactRouter } from "./contact-router.js";
import { demoRouter } from "./demo-router.js";
import { createRouter, publicQuery } from "./middleware.js";

export const appRouter = createRouter({
  ping: publicQuery.query(async () => {
    return {
      ok: true,
      version: "1.2.0",
      ts: Date.now(),
      mode: "standalone"
    };
  }),
  seed: publicQuery.mutation(async () => {
    const users = [
      {
        "id": 1,
        "email": "admin@algodeck.app",
        "passwordHash": "$2b$10$BVfb4fQ9VL32lfVOWR7I.enpl47f69c0PGzXlbkOVmVcfhaZzsaCG",
        "role": "admin"
      }
    ];
    await redis.set("users", users);
    return { success: true };
  }),
  auth: authRouter,
  newsletter: newsletterRouter,
  contact: contactRouter,
  demo: demoRouter,
});

export type AppRouter = typeof appRouter;
