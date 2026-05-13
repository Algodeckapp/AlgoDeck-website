import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../lib/env";
import * as schema from "../../db/schema";
import * as relations from "../../db/relations";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>> | null = null;

export function getDb() {
  if (!instance) {
    if (!env.databaseUrl) {
      throw new Error("DATABASE_URL is missing. Please add it to Vercel environment variables.");
    }
    
    try {
      instance = drizzle(env.databaseUrl, {
        schema: fullSchema,
        mode: "planetscale",
      });
    } catch (err: any) {
      console.error("[DATABASE CONNECTION ERROR]", err);
      throw new Error(`Failed to initialize database connection: ${err.message}`);
    }
  }
  return instance;
}
