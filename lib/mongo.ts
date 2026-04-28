import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "portfolio";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function clientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoClientPromise;
  }

  return new MongoClient(uri).connect();
}

let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;
  const client = await clientPromise();
  cachedDb = client.db(dbName);
  return cachedDb;
}

export const collections = {
  chatSessions: "chat_sessions",
  chatAnalytics: "chat_analytics",
  flightDemos: "flight_demos",
  jdMatches: "jd_matches",
  guestbook: "guestbook",
  rateLimits: "rate_limits",
} as const;
