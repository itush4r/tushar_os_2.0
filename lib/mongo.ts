import { Db, MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "portfolio";

const clientOptions: MongoClientOptions = {
  maxPoolSize: 5,
  minPoolSize: 0,
  maxIdleTimeMS: 60_000,
  serverSelectionTimeoutMS: 5_000,
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function clientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, clientOptions).connect();
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  return client.db(dbName);
}

export const collections = {
  chatSessions: "chat_sessions",
  chatAnalytics: "chat_analytics",
  flightDemos: "flight_demos",
  jdMatches: "jd_matches",
  guestbook: "guestbook",
  rateLimits: "rate_limits",
} as const;
