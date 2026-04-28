import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "portfolio";

const SECONDS = 1;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;

async function main() {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  const client = await new MongoClient(uri).connect();
  try {
    const db = client.db(dbName);

    await db.collection("chat_sessions").createIndexes([
      { key: { startedAt: 1 }, expireAfterSeconds: 30 * DAYS, name: "ttl_startedAt" },
      { key: { ipHash: 1 }, name: "ipHash_idx" },
    ]);

    await db.collection("chat_analytics").createIndexes([
      { key: { normalizedQuestion: 1 }, name: "normalizedQuestion_idx", unique: true },
      { key: { askedCount: -1 }, name: "askedCount_desc" },
    ]);

    await db
      .collection("flight_demos")
      .createIndexes([{ key: { createdAt: -1 }, name: "createdAt_desc" }]);

    await db
      .collection("jd_matches")
      .createIndexes([{ key: { createdAt: -1 }, name: "createdAt_desc" }]);

    await db.collection("guestbook").createIndexes([
      {
        key: { moderationStatus: 1, createdAt: -1 },
        name: "moderationStatus_createdAt",
      },
    ]);

    await db.collection("rate_limits").createIndexes([
      { key: { windowStart: 1 }, expireAfterSeconds: 1 * HOURS, name: "ttl_windowStart" },
      { key: { ipHash: 1, endpoint: 1 }, name: "ipHash_endpoint", unique: true },
    ]);

    // eslint-disable-next-line no-console
    console.log("✓ All indexes created");
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
