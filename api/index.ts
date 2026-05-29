import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { handle } from "hono/vercel";
import { appRouter } from "./router.js";
import { createContext } from "./context.js";
import { env } from "./lib/env.js";

const app = new Hono<{ Bindings: HttpBindings }>();
console.log(`[BOOT] Hono server starting at ${new Date().toISOString()}`);

// Basic middleware
app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// Diagnostic endpoint
app.get("/api/ping", async (c) => {
  return c.json({
    status: "pong",
    version: "1.2.0",
    time: new Date().toISOString(),
    env: {
      isProduction: env.isProduction,
      hasSecret: !!process.env.APP_SECRET,
    },
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
  return c.json({
    error: "Internal Server Error",
    message: err.message,
    name: err.name,
  }, 500);
});

app.all("/api/*", (c) => c.json({ error: "Not Found", path: c.req.path }, 404));

// Vercel export
const handler = handle(app);
export default process.env.VERCEL ? handler : app;
