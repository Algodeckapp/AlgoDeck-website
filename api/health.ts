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
    message: "Comprehensive Health Check",
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      APP_ID: !!process.env.APP_ID,
      APP_SECRET: !!process.env.APP_SECRET,
      KIMI_AUTH_URL: !!process.env.KIMI_AUTH_URL,
      KIMI_OPEN_URL: !!process.env.KIMI_OPEN_URL,
      VITE_KIMI_AUTH_URL: !!process.env.VITE_KIMI_AUTH_URL,
      VITE_APP_ID: !!process.env.VITE_APP_ID,
      NODE_ENV: process.env.NODE_ENV,
    }
  });
});

export default handle(app);
