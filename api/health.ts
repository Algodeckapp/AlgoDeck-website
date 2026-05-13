import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
  runtime: 'edge',
};

const app = new Hono();

app.get("*", (c) => {
  return c.json({
    status: "ok",
    path: c.req.path,
    message: "Minimal Health Check",
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
    }
  });
});

export default handle(app);
