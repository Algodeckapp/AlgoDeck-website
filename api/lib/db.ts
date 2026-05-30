import { Redis } from '@upstash/redis';

// Vercel KV environment variables (automatically handled by fromEnv)
export const redis = Redis.fromEnv();
