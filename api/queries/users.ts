import { readJson, writeJson, db } from "../lib/json-db.js";

export async function findUserById(id: number) {
  const users = await readJson(db.users);
  return users.find((u: any) => u.id === id);
}

export async function findUserByEmail(email: string) {
  const users = await readJson(db.users);
  return users.find((u: any) => u.email === email.toLowerCase());
}

export async function updateUser(id: number, data: any) {
  const users = await readJson(db.users);
  const index = users.findIndex((u: any) => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...data };
    await writeJson(db.users, users);
  }
}
