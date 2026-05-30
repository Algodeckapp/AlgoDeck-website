import "dotenv/config";

/**
 * Returns an environment variable or a safe fallback.
 * Prevents top-level crashes if variables are missing on Vercel.
 */
function getEnv(name: string, fallback = ""): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    console.warn(`[BOOT WARNING] Environment variable ${name} is not set.`);
  }
  return value ?? fallback;
}

export const env = {
  appId: getEnv("APP_ID", "missing-app-id"),
  appSecret: getEnv("APP_SECRET", "temporary-secret-for-boot-only-change-this"),
  resendApiKey: getEnv("RESEND_API_KEY"),
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: getEnv("DATABASE_URL"),
  ownerUnionId: getEnv("OWNER_UNION_ID"),
};
