import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "../lib/env.js";
import * as schema from "../../db/schema.js";
import * as relations from "../../db/relations.js";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>> | null = null;

export function getDb() {
  if (!instance) {
    if (!env.databaseUrl) {
      throw new Error("DATABASE_URL is missing. Please add it to Vercel environment variables.");
    }
    
    try {
      // Create a connection pool which is more efficient for serverless environments
      const pool = mysql.createPool({
        uri: env.databaseUrl,
        connectionLimit: 1,
        connectTimeout: 10000, // 10 seconds timeout
        waitForConnections: true,
        queueLimit: 0,
        ssl: env.databaseUrl.includes("ssl") ? undefined : {
          rejectUnauthorized: false
        }
      });
      
      instance = drizzle(pool, {
        schema: fullSchema,
        mode: "default",
      });
    } catch (err: any) {
      console.error("[DATABASE CONNECTION ERROR]", err);
      throw new Error(`Failed to initialize database connection: ${err.message}`);
    }
  }
  return instance;
}

