import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { handle } from "hono/vercel";
import { appRouter } from "./router.js";
import { createContext } from "./context.js";

const app = new Hono();

// Basic middleware
app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// Diagnostic endpoint
app.get("/api/ping", async (c) => {
  return c.json({
    status: "pong",
    version: "1.2.0",
    time: new Date().toISOString(),
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
  return c.json({ error: "Internal Server Error" }, 500);
});

// Vercel export
export default handle(app);
