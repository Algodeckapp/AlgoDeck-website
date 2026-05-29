import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { handle } from "hono/vercel";
import { sql } from "drizzle-orm";
import { appRouter } from "./router.js";
import { createContext } from "./context.js";
import { env } from "./lib/env.js";
import { getDb } from "./queries/connection.js";

const app = new Hono<{ Bindings: HttpBindings }>();
console.log(`[BOOT] Hono server starting at ${new Date().toISOString()}`);

// Basic middleware
app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// Diagnostic endpoint
app.get("/api/ping", async (c) => {
  let dbStatus = "unknown";
  let dbError = null;

  try {
    if (env.databaseUrl) {
      const db = getDb();
      // Use a race to ensure we don't hang for 300s
      const dbCheck = db.execute(sql`SELECT 1`);
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Database check timed out after 5s")), 5000)
      );
      
      await Promise.race([dbCheck, timeout]);
      dbStatus = "connected";
    } else {
      dbStatus = "missing_url";
    }
  } catch (err: any) {
    dbStatus = "error";
    dbError = err.message || String(err);
  }

  return c.json({
    status: "pong",
    version: "1.1.2", // Incremented to verify deployment
    time: new Date().toISOString(),
    env: {
      isProduction: env.isProduction,
      hasDb: !!env.databaseUrl,
      hasSecret: !!process.env.APP_SECRET,
    },
    database: {
      status: dbStatus,
      error: dbError,
    }
  });
});

// TRPC Handler
app.all("/api/trpc/*", async (c) => {
  return await fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
    onError: ({ path, error }) => {
      console.error(`[TRPC ERROR] Path: ${path || "unknown"}, Code: ${error.code}, Message: ${error.message}`);
    },
  });
});

// Error handling
app.onError((err, c) => {
  console.error(`[HONO ERROR] ${err.name}: ${err.message}`);
  console.error(err.stack);
  return c.json({
    error: "Internal Server Error",
    message: err.message,
    name: err.name,
    stack: env.isProduction ? undefined : err.stack,
  }, 500);
});

app.all("/api/*", (c) => c.json({ error: "Not Found", path: c.req.path }, 404));

// Vercel export
const handler = handle(app);
export default process.env.VERCEL ? handler : app;
