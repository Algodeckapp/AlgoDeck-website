import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "../lib/env.js";
import * as schema from "../../db/schema.js";
import * as relations from "../../db/relations.js";

// Combine schema and relations into a single object
const fullSchema = { ...schema, ...relations };

let instance: any = null;

export function getDb() {
  if (!instance) {
    console.log("[getDb] Initializing database connection...");
    if (!env.databaseUrl) {
      console.error("[getDb] DATABASE_URL is missing!");
      throw new Error("DATABASE_URL is missing. Please add it to your environment variables.");
    }
    
    try {
      // Create a connection pool
      const pool = mysql.createPool({
        uri: env.databaseUrl,
        connectionLimit: 1,
        connectTimeout: 10000,
        ssl: {
          rejectUnauthorized: false
        }
      });
      
      // Try to initialize with mode: default first
      try {
        console.log("[getDb] Attempting Drizzle init with mode: default...");
        instance = drizzle(pool, { 
          schema: fullSchema, 
          mode: "default" 
        });
      } catch (innerErr: any) {
        console.warn("[getDb] mode: default failed, trying mode: planetscale...", innerErr.message);
        instance = drizzle(pool, { 
          schema: fullSchema, 
          mode: "planetscale" 
        });
      }
      
      console.log("[getDb] Drizzle instance created successfully.");
    } catch (err: any) {
      console.error("[DATABASE CONNECTION ERROR]", err);
      throw new Error(`Failed to initialize database connection: ${err.message}`);
    }
  }
  return instance;
}

