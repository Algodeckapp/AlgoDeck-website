import * as cookie from "cookie";
import { z } from "zod";
import { Session } from "../contracts/constants.js";
import { getSessionCookieOptions } from "./lib/cookies.js";
import { createRouter, authedQuery, publicQuery } from "./middleware.js";
import { signSessionToken } from "./lib/session.js";
import { hashPassword, verifyPassword } from "./lib/crypto.js";
import { TRPCError } from "@trpc/server";
import { kv } from "./lib/db.js";

export const authRouter = createRouter({
  me: authedQuery.query((opts) => opts.ctx.user),
  
  login: publicQuery
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const users = (await kv.get<any[]>("users")) || [];
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
    .mutation(async ({ input, ctx }) => {
      const users = (await kv.get<any[]>("users")) || [];
      const userIndex = users.findIndex((u: any) => u.id === ctx.user?.id);

      if (userIndex === -1) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }

      const user = users[userIndex];
      const isValid = await verifyPassword(input.currentPassword, user.passwordHash);
      if (!isValid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect current password" });
      }

      users[userIndex].passwordHash = await hashPassword(input.newPassword);
      await kv.set("users", users);
      
      return { success: true };
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
