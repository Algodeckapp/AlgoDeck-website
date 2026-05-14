import { authRouter } from "./auth-router.js";
import { newsletterRouter } from "./newsletter-router.js";
import { contactRouter } from "./contact-router.js";
import { demoRouter } from "./demo-router.js";
import { createRouter, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { users } from "../db/schema.js";
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
