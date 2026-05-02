import { authRouter } from "./auth-router";
import { newsletterRouter } from "./newsletter-router";
import { contactRouter } from "./contact-router";
import { demoRouter } from "./demo-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  newsletter: newsletterRouter,
  contact: contactRouter,
  demo: demoRouter,
});

export type AppRouter = typeof appRouter;
