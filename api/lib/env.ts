import "dotenv/config";

function getEnv(name: string, isRequired = true): string {
  const value = process.env[name];
  if (!value && isRequired && process.env.NODE_ENV === "production") {
    console.warn(`[Env Warning] Missing required environment variable: ${name}`);
    // We don't throw here to allow health checks to run, 
    // but the app will likely fail later when these are used.
  }
  return value ?? "";
}

export const env = {
  appId: getEnv("APP_ID"),
  appSecret: getEnv("APP_SECRET"),
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: getEnv("DATABASE_URL"),
  kimiAuthUrl: getEnv("KIMI_AUTH_URL"),
  kimiOpenUrl: getEnv("KIMI_OPEN_URL"),
  ownerUnionId: getEnv("OWNER_UNION_ID", false),
};
