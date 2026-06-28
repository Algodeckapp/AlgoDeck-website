import bcrypt from "bcryptjs";

/**
 * Hash a password using bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verify a password against a stored bcrypt hash.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, storedHash);
  } catch (error) {
    console.error("[Crypto] Verification failed:", error);
    return false;
  }
}
