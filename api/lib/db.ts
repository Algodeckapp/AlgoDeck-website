import { Redis } from '@upstash/redis';
import { readJson, writeJson } from './json-db.js';
import path from 'path';

let redisInstance: Redis | null = null;

// Support both Upstash defaults and Vercel KV defaults
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

try {
  if (redisUrl && redisToken) {
    redisInstance = new Redis({
      url: redisUrl,
      token: redisToken,
    });
  }
} catch (error) {
  console.warn("[DB] Redis initialization failed:", error);
}

export const kv = {
  async get<T>(key: string): Promise<T | null> {
    if (redisInstance) {
      try {
        return await redisInstance.get<T>(key);
      } catch (err) {
        console.error(`[DB] Redis GET failed for ${key}:`, err);
      }
    }
    
    // Fallback to local JSON (works on localhost, read-only on Vercel)
    const filePath = path.join(process.cwd(), 'data', `${key}.json`);
    const data = await readJson(filePath);
    return (Array.isArray(data) && data.length === 0 && key === 'users') ? null : data as T;
  },

  async set(key: string, value: any): Promise<void> {
    if (redisInstance) {
      try {
        await redisInstance.set(key, value);
        return;
      } catch (err) {
        console.error(`[DB] Redis SET failed for ${key}:`, err);
      }
    }

    // Fallback to local JSON for localhost
    try {
      const filePath = path.join(process.cwd(), 'data', `${key}.json`);
      await writeJson(filePath, value);
    } catch (error) {
      // Silent fail on read-only filesystems (Vercel)
    }
  },

  /**
   * Returns information about the current storage backend
   */
  status() {
    return {
      type: redisInstance ? 'redis' : 'json',
      connected: !!redisInstance,
      url: redisUrl ? `${redisUrl.substring(0, 15)}...` : 'not set',
    };
  }
};

export { redisInstance as redis };
