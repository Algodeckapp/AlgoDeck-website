import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { handle } from "hono/vercel";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { createOAuthCallbackHandler } from "./kimi/auth";
import { Paths } from "@contracts/constants";

// For Vercel, we mount at /api because the file is in the /api directory
const app = new Hono<{ Bindings: HttpBindings }>().basePath("/api");

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// Routes are now relative to /api
app.get("/oauth/callback", createOAuthCallbackHandler());

app.use("/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});

app.all("*", (c) => c.json({ error: "Not Found", path: c.req.path }, 404));

// Vercel Export (Standard)
export default handle(app);

// Standalone server for local development
if (env.isProduction && !process.env.VERCEL) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  
  // Create a separate app for local to handle the /api prefix correctly
  const localApp = new Hono();
  localApp.route("/", app);
  
  serveStaticFiles(localApp);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: localApp.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
