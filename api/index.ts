import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.get("/api/ping", (c) => {
  return c.text("pong");
});

export default handle(app);
