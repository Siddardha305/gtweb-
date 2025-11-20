/**
 * MongoDB Connection Diagnostics
 * Use this to test your MongoDB connection
 */

import { MongoClient } from "mongodb";

export async function testMongoDBConnection(uri: string, dbName: string) {
  console.log("🔍 Testing MongoDB connection...");
  console.log("URI:", uri.replace(/:[^@]*@/, ":****@")); // Hide password
  console.log("Database:", dbName);

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 2,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    retryWrites: true,
    retryReads: true,
  });

  try {
    console.log("⏳ Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected successfully!");

    const db = client.db(dbName);
    console.log("📦 Database:", dbName);

    // Test connection with a ping
    const result = await db.admin().ping();
    console.log("📡 Ping result:", result);

    // List collections
    const collections = await db.listCollections().toArray();
    console.log("📋 Collections:", collections.map((c) => c.name));

    console.log("✅ MongoDB connection test PASSED!");
    return { success: true, message: "Connection successful" };
  } catch (error: any) {
    console.error("❌ Connection test FAILED!");
    console.error("Error:", error.message);
    console.error("Code:", error.code);
    return { success: false, error: error.message };
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

// Run test if executed directly
if (require.main === module) {
  const uri = process.env.MONGODB_URI || "";
  const dbName = process.env.MONGODB_DB || "gtweb";

  if (!uri) {
    console.error("❌ MONGODB_URI not set in environment variables");
    process.exit(1);
  }

  testMongoDBConnection(uri, dbName).then((result) => {
    process.exit(result.success ? 0 : 1);
  });
}
