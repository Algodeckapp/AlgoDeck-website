import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertUser } from "@db/schema";
import { getDb } from "./connection";
import { env } from "../lib/env";

export async function findUserByUnionId(unionId: string) {
  const rows = await getDb()
    .select()
    .from(schema.users)
    .where(eq(schema.users.unionId, unionId))
    .limit(1);
  return rows.at(0);
}

export async function upsertUser(data: InsertUser) {
  const db = getDb();
  
  // Check if user exists
  const existing = await findUserByUnionId(data.unionId);

  const values = { ...data };
  if (
    values.role === undefined &&
    values.unionId &&
    values.unionId === env.ownerUnionId
  ) {
    values.role = "admin";
  }

  if (existing) {
    // Update
    await db
      .update(schema.users)
      .set({
        name: values.name || existing.name,
        email: values.email || existing.email,
        avatar: values.avatar || existing.avatar,
        role: values.role || existing.role,
        lastSignInAt: new Date(),
      })
      .where(eq(schema.users.unionId, data.unionId));
  } else {
    // Insert
    await db.insert(schema.users).values(values);
  }
}
