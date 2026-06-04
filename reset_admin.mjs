import bcrypt from "bcryptjs";
import fs from 'fs-extra';
import path from 'path';

const hash = bcrypt.hashSync("ChangeMe123!", 10);
const users = [
  {
    "id": 1,
    "email": "admin@algodeck.app",
    "passwordHash": hash,
    "role": "admin"
  }
];

const filePath = path.join(process.cwd(), 'data', 'users.json');
await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
console.log("Reset admin password to ChangeMe123!");
