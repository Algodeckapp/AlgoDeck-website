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

// Basic middleware
app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// Diagnostic endpoint
app.get("/api/ping", async (c) => {
  let dbStatus = "unknown";
  let dbError = null;

  try {
    if (env.databaseUrl) {
      const db = getDb();
      // Simple query to check connection
      await db.execute(sql`SELECT 1`);
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
app.use("/api/trpc/*", async (c) => {
  try {
    // Some serverless environments might not provide a full Request object in c.req.raw
    // We ensure it's a valid Request object that fetchRequestHandler can handle
    let req = c.req.raw;
    
    // Check if req.headers exists and has the 'has' method
    if (!req.headers || typeof req.headers.has !== 'function') {
      console.warn("[TRPC] Invalid Request object detected, reconstructing...");
      const headers = new Headers();
      // Copy headers from Hono's request wrapper which is more reliable
      c.req.header(); // populate internal headers
      Object.entries(c.req.header()).forEach(([key, value]) => {
        if (value) headers.set(key, value);
      });

      req = new Request(c.req.url, {
        method: c.req.method,
        headers,
        body: c.req.method !== 'GET' && c.req.method !== 'HEAD' ? await c.req.raw.clone().blob() : undefined,
      });
    }

    return await fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext,
      onError: ({ path, error }) => {
        console.error(`[TRPC ERROR] Path: ${path || "unknown"}, Code: ${error.code}, Message: ${error.message}`);
        if (error.cause) {
          console.error(`[TRPC CAUSE]`, error.cause);
        }
      },
    });
  } catch (err: any) {
    console.error("[TRPC ADAPTER ERROR]", err);
    return c.json({ error: "TRPC Handler Failed", message: err.message }, 500);
  }
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
