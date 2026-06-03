import * as cookie from "cookie";
import { z } from "zod";
import { Session } from "../contracts/constants.js";
import { getSessionCookieOptions } from "./lib/cookies.js";
import { createRouter, authedQuery, publicQuery } from "./middleware.js";
import { signSessionToken } from "./lib/session.js";
import { verifyPassword } from "./lib/crypto.js";
import { TRPCError } from "@trpc/server";
import { readJson, db } from "./lib/json-db.js";

export const authRouter = createRouter({
  me: authedQuery.query((opts) => opts.ctx.user),
  
  login: publicQuery
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const users = await readJson(db.users);
      const user = users.find((u: any) => u.email === input.email.toLowerCase());

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      const isValid = await verifyPassword(input.password, user.passwordHash as string);
      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      const token = await signSessionToken({
        id: user.id as number,
        email: user.email as string,
      });

      const opts = getSessionCookieOptions(ctx.req.headers);
      ctx.resHeaders.append(
        "set-cookie",
        cookie.serialize(Session.cookieName, token, {
          httpOnly: opts.httpOnly,
          path: opts.path,
          sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
          secure: opts.secure,
          maxAge: Session.maxAgeMs / 1000,
        }),
      );
      
      return { success: true };
    }),

  changePassword: authedQuery
    .input(z.object({
      currentPassword: z.string(),
      newPassword: z.string().min(8),
    }))
    .mutation(async () => {
      // In production (Vercel), we can't write to JSON files.
      // This is primarily for local dev or simple admin access.
      throw new TRPCError({
        code: "METHOD_NOT_SUPPORTED",
        message: "Password change is disabled in the direct-mapping version.",
      });
    }),

  logout: authedQuery.mutation(async ({ ctx }) => {
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );
    return { success: true };
  }),
});
