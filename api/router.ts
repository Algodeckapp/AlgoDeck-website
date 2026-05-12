import { authRouter } from "./auth-router";
import { newsletterRouter } from "./newsletter-router";
import { contactRouter } from "./contact-router";
import { demoRouter } from "./demo-router";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users } from "@db/schema";
import { sql } from "drizzle-orm";

export const appRouter = createRouter({
  ping: publicQuery.query(async () => {
    let dbStatus = "unknown";
    let dbError = null;

    try {
      // Test DB connection and check if users table exists
      await getDb().select({ count: sql`count(*)` }).from(users).limit(1);
      dbStatus = "connected";
    } catch (err: any) {
      dbStatus = "error";
      dbError = err.message || String(err);
    }

    return { 
      ok: true, 
      ts: Date.now(),
      database: dbStatus,
      dbError
    };
  }),
  auth: authRouter,
  newsletter: newsletterRouter,
  contact: contactRouter,
  demo: demoRouter,
});

export type AppRouter = typeof appRouter;
