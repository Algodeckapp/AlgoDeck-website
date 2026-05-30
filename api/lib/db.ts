import { Redis } from '@upstash/redis';

// Vercel KV environment variables
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});
