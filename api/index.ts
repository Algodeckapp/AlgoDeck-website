import { Hono } from "hono";
import { handle } from "hono/vercel";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./_src/router.js";
import { createContext } from "./_src/context.js";

const app = new Hono();

app.get("/api/ping", (c) => {
  return c.text("pong");
});

app.all("/api/trpc/*", (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: (opts) => createContext(opts),
  });
});

export default app;
export const handler = handle(app);
