import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const connection = await mysql.createConnection(connectionString);
  const db = drizzle(connection);

  console.log("Running migrations...");

  await migrate(db, {
    migrationsFolder: path.resolve(__dirname, "./migrations"),
  });

  console.log("Migrations completed!");
  await connection.end();
}

runMigration().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
