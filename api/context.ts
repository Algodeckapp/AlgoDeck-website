import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import * as cookie from "cookie";
import { Session } from "../contracts/constants.js";
import { verifySessionToken } from "./lib/session.js";
import { readJson, db } from "./lib/json-db.js";

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
        const users = await readJson(db.users);
        ctx.user = users.find((u: any) => u.id === claim.id);
      }
    }
  } catch (error) {
    console.error("[context] Auth failed:", error);
  }

  return ctx;
}
