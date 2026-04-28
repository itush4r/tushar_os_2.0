import { createHash } from "node:crypto";

export function hashIp(ip: string, salt?: string): string {
  const s = salt ?? process.env.MONGODB_URI_HASH_SALT;
  if (!s) {
    throw new Error("MONGODB_URI_HASH_SALT is not set");
  }
  return createHash("sha256").update(`${s}:${ip}`).digest("hex");
}
