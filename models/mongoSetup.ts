import { MongoClient, Db, CreateCollectionOptions } from "mongodb";
import {
  customerInquiryCollectionSchema,
  recommendedIndexes,
} from "./CustomerInquiry";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "growsin";

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Initialize the MongoDB connection and set up the contacts collection
 * with schema validation and indexes.
 * Call this function once during application startup.
 */
export async function setupContactsCollection() {
  try {
    const client = new MongoClient(uri);
    const db = client.db(dbName);

    // Check if collection exists
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some((c) => c.name === "contacts");

    if (!collectionExists) {
      console.log("Creating 'contacts' collection with schema validation...");
      await db.createCollection(
        "contacts",
        customerInquiryCollectionSchema as CreateCollectionOptions
      );
      console.log("✅ Collection 'contacts' created successfully");
    } else {
      console.log("✅ Collection 'contacts' already exists");
    }

    // Create indexes
    const collection = db.collection("contacts");
    console.log("Creating indexes for optimal query performance...");

    for (const index of recommendedIndexes) {
      try {
        const indexKey = index.key as unknown as Record<string, 1 | -1>;
        await collection.createIndex(indexKey, { name: index.name });
        console.log(`✅ Index created: ${index.name}`);
      } catch (err: any) {
        if (err.codeName === "IndexAlreadyExists") {
          console.log(`⚠️  Index already exists: ${index.name}`);
        } else {
          console.error(`❌ Error creating index ${index.name}:`, err.message);
        }
      }
    }

    await client.close();
    console.log("✅ MongoDB setup completed successfully");
  } catch (err: any) {
    console.error("❌ Error setting up MongoDB collection:", err.message);
    throw err;
  }
}

/**
 * Get the contacts collection from MongoDB
 */
export async function getContactsCollection(client: MongoClient) {
  const db = client.db(dbName);
  return db.collection("contacts");
}
