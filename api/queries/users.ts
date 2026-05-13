import { eq } from "drizzle-orm";
import * as schema from "../../db/schema";
import type { InsertUser } from "../../db/schema";
import { getDb } from "./connection";

export async function findUserById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, id))
    .limit(1);
  return rows.at(0);
}

export async function findUserByEmail(email: string) {
  const rows = await getDb()
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email.toLowerCase()))
    .limit(1);
  return rows.at(0);
}

export async function createUser(data: InsertUser) {
  const db = getDb();
  
  // First user created is always an admin
  const userCount = await db.$count(schema.users);
  const role = userCount === 0 ? "admin" : (data.role || "user");

  const result = await db.insert(schema.users).values({
    ...data,
    email: data.email.toLowerCase(),
    role,
  });

  return result;
}

export async function updateUser(id: number, data: Partial<InsertUser>) {
  const db = getDb();
  await db
    .update(schema.users)
    .set({
      ...data,
      email: data.email?.toLowerCase(),
      lastSignInAt: data.lastSignInAt || new Date(),
    })
    .where(eq(schema.users.id, id));
}
