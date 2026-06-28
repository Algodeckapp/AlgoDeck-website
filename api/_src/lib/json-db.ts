import fs from 'fs-extra';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');

export const db = {
  submissions: path.join(DATA_DIR, 'submissions.json'),
  users: path.join(DATA_DIR, 'users.json'),
};

export async function readJson(filePath: string) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function writeJson(filePath: string, data: any) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
