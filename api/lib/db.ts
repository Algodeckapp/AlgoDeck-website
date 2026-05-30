import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from "../lib/env.js";

if (!env.databaseUrl) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

// Disable prefetch as it is not supported for serverless functions
const queryClient = postgres(env.databaseUrl, { prepare: false });
export const db = drizzle(queryClient);
