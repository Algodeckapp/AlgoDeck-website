import { authRouter } from "./auth-router.js";
import { newsletterRouter } from "./newsletter-router.js";
import { contactRouter } from "./contact-router.js";
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
  auth: authRouter,
  newsletter: newsletterRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
