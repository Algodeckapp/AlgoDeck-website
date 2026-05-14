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
app.use("/api/trpc/*", async (c) => {
  try {
    // Manually reconstruct the Request object to ensure it's fully standard and has all methods (like headers.has)
    const headers = new Headers();
    Object.entries(c.req.header()).forEach(([key, value]) => {
      if (value) headers.set(key, value);
    });

    // Use Hono's built-in methods to get the body reliably
    let body: any = undefined;
    if (c.req.method !== "GET" && c.req.method !== "HEAD") {
      try {
        body = await c.req.raw.clone().arrayBuffer();
      } catch (e) {
        console.warn("[TRPC] Could not clone request body", e);
      }
    }

    const req = new Request(c.req.url, {
      method: c.req.method,
      headers,
      body,
      // @ts-ignore - needed for Node.js fetch with bodies
      duplex: body ? "half" : undefined,
    });

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
