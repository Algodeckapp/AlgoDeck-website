import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { handle } from "hono/vercel";
import { appRouter } from "./router.js";
import { createContext } from "./context.js";
import { env } from "./lib/env.js";

const app = new Hono();
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
  const request = c.req.raw;
  // Vercel/Node environment sometimes has issues with raw request headers. 
  // Construct a safe, standard Request object.
  const req = new Request(request.url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    // @ts-ignore
    duplex: 'half'
  });

  return await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
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

// Vercel export - Correctly using the handle wrapper
export default handle(app);
