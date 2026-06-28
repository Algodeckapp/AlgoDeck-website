import * as jose from "jose";
import { env } from "../lib/env.js";

const JWT_ALG = "HS256";

export type SessionPayload = {
  id: number;
  email: string;
};

export async function signSessionToken(
  payload: SessionPayload,
): Promise<string> {
  const secret = new TextEncoder().encode(env.appSecret);
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime("30 days")
    .sign(secret);
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  if (!token) return null;
  
  try {
    const secret = new TextEncoder().encode(env.appSecret);
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: [JWT_ALG],
    });
    
    const { id, email } = payload as any;
    if (id === undefined || !email) {
      return null;
    }
    
    return { id, email };
  } catch (error) {
    console.warn("[session] JWT verification failed:", error);
    return null;
  }
}
