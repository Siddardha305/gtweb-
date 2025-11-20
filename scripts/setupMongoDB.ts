/**
 * MongoDB Schema Setup Script
 * Run this script once to initialize the MongoDB database with proper collection schema and indexes
 *
 * Usage: npx ts-node scripts/setupMongoDB.ts
 * Or add as a build/setup script in package.json
 */

import { setupContactsCollection } from "../models/mongoSetup";

async function main() {
  console.log("🚀 Starting MongoDB collection setup...\n");

  try {
    await setupContactsCollection();
    console.log("\n✅ MongoDB setup completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Setup failed:", error);
    process.exit(1);
  }
}

main();
