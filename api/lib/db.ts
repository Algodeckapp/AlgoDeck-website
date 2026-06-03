import { Redis } from '@upstash/redis';
import { readJson, writeJson } from './json-db.js';
import path from 'path';

let redisInstance: Redis | null = null;

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redisInstance = Redis.fromEnv();
  }
} catch (error) {
  console.warn("[DB] Redis initialization skipped or failed.");
}

export const kv = {
  async get<T>(key: string): Promise<T | null> {
    if (redisInstance) {
      return await redisInstance.get<T>(key);
    }
    
    // Fallback to local JSON for localhost
    const filePath = path.join(process.cwd(), 'data', `${key}.json`);
    const data = await readJson(filePath);
    return (Array.isArray(data) && data.length === 0 && key === 'users') ? null : data as T;
  },

  async set(key: string, value: any): Promise<void> {
    if (redisInstance) {
      await redisInstance.set(key, value);
      return;
    }

    // Fallback to local JSON for localhost
    try {
      const filePath = path.join(process.cwd(), 'data', `${key}.json`);
      await writeJson(filePath, value);
    } catch (error) {
      // Silent fail on read-only filesystems (Vercel)
    }
  }
};

// Maintain backward compatibility for existing imports
export { redisInstance as redis };
