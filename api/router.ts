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
      const db = getDb();
      // Test DB connection with timeout
      const dbCheck = db.select({ count: sql`count(*)` }).from(users).limit(1);
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("DB check timed out")), 5000)
      );
      
      await Promise.race([dbCheck, timeout]);
      dbStatus = "connected";
    } catch (err: any) {
      dbStatus = "error";
      dbError = err.message || String(err);
    }

    return { 
      ok: true, 
      version: "1.1.2",
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
