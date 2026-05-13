import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api/health");

app.get("/", (c) => {
  return c.json({
    status: "ok",
    message: "Isolated Health Check",
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    }
  });
});

export default handle(app);
