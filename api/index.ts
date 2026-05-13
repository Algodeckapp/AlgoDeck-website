import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { handle } from "hono/vercel";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { createOAuthCallbackHandler } from "./kimi/auth";
import { Paths } from "../contracts/constants";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

app.onError((err, c) => {
  console.error(`[Hono Error] ${err.name}: ${err.message}`, err.stack);
  return c.json({
    error: "Internal Server Error",
    message: err.message,
    name: err.name,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  }, 500);
});

// Basic health check to debug deployment
app.get("/api/health", (c) => {
  const envStatus = {
    APP_ID: !!process.env.APP_ID,
    APP_SECRET: !!process.env.APP_SECRET,
    DATABASE_URL: !!process.env.DATABASE_URL,
    KIMI_AUTH_URL: !!process.env.KIMI_AUTH_URL,
    KIMI_OPEN_URL: !!process.env.KIMI_OPEN_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
  };
  return c.json({ status: "ok", env: envStatus });
});

// Routes (Vercel handles the /api prefix, but we include it for local dev consistency)
app.get("/api/oauth/callback", createOAuthCallbackHandler());

app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});

app.all("/api/*", (c) => c.json({ error: "Not Found", path: c.req.path }, 404));

export default handle(app);

// Standalone server for local development/production
if (env.isProduction && !process.env.VERCEL) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
