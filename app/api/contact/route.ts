// app/api/contact/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "gtweb"; // default to gtweb to match connection string

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

// Cache the MongoClient across lambda invocations (Vercel, etc.)
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 2,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    retryWrites: true,
    retryReads: true,
  });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise!;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Basic server-side validation
    const { name, email, company, phone, budget, message } = data || {};
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    console.log("📝 Processing contact form submission:", { name, email });

    const client = await clientPromise;
    const db = client.db(dbName);
    const col = db.collection("contacts");

    const insertDoc = {
      name,
      email,
      company: company || null,
      phone: phone || null,
      budget: budget || null,
      message,
      source: "website-contact",
      createdAt: new Date(),
    };

    console.log("💾 Inserting document into MongoDB...");
    const result = await col.insertOne(insertDoc);
    console.log("✅ Document inserted successfully with ID:", result.insertedId);

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (err: any) {
    console.error("❌ API /api/contact error:", err.message);
    console.error("Error code:", err.code);
    console.error("Error type:", err.name);
    
    // Check if it's an SSL/connection error
    if (err.message?.includes("SSL") || err.message?.includes("ssl")) {
      console.error("🔐 SSL/TLS Connection Error detected");
      console.error("Full error:", err);
      return NextResponse.json(
        { 
          error: "MongoDB SSL connection error. Please check your MongoDB cluster whitelist and network connectivity.",
          details: err.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
