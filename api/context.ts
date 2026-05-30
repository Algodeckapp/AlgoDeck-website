import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import * as cookie from "cookie";
import { Session } from "../contracts/constants.js";
import { verifySessionToken } from "./lib/session.js";
import { db } from "./lib/db.js";
import { sql } from "drizzle-orm";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: any;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  try {
    const cookies = cookie.parse(opts.req.headers.get("cookie") || "");
    const token = cookies[Session.cookieName];

    if (token) {
      const claim = await verifySessionToken(token);
      if (claim) {
        const result = await db.execute(sql`SELECT * FROM users WHERE id = ${claim.id} LIMIT 1`);
        if (result.length > 0) {
            ctx.user = result[0];
        }
      }
    }
  } catch (error) {
    console.error("[context] Auth failed:", error);
  }

  return ctx;
}
