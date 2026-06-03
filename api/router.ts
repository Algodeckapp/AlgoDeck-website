import { authRouter } from "./auth-router.js";
import { newsletterRouter } from "./newsletter-router.js";
import { contactRouter } from "./contact-router.js";
import { demoRouter } from "./demo-router.js";
import { createRouter, publicQuery } from "./middleware.js";
import { kv } from "./lib/db.js";

export const appRouter = createRouter({
  ping: publicQuery.query(async () => {
    return {
      ok: true,
      version: "1.2.1",
      ts: Date.now(),
      mode: "standalone",
      storage: kv.status()
    };
  }),
  auth: authRouter,
  newsletter: newsletterRouter,
  contact: contactRouter,
  demo: demoRouter,
});

export type AppRouter = typeof appRouter;
