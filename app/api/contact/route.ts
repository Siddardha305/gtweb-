// app/api/contact/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const DB_NAME = process.env.MONGODB_DB || "gtweb";

async function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) { 
    // Throw here so the error happens at request time (not build time).
    throw new Error(
      "Please define the MONGODB_URI environment variable (e.g. in .env.local or in Vercel project settings)."
    );
  }

  if (global._mongoClientPromise) {
    return global._mongoClientPromise;
  }

  // Lazy import so `mongodb` is not required during module evaluation.
  const { MongoClient } = await import("mongodb");

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 2,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    retryWrites: true,
    retryReads: true,
  });

  // store the promise so subsequent calls reuse the same connecting promise/client
  global._mongoClientPromise = client.connect();
  return global._mongoClientPromise;
}

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

    // Get connected client (this will throw a friendly error if MONGODB_URI missing)
    const client = await getMongoClient();
    const db = client.db(DB_NAME);
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

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("❌ API /api/contact error:", err?.message || err);
    console.error("Error code:", err?.code);
    console.error("Error type:", err?.name);

    // SSL/connection-specific message (keeps your helpful messaging)
    if (err?.message?.toLowerCase()?.includes("ssl")) {
      console.error("🔐 SSL/TLS Connection Error detected");
      console.error("Full error:", err);
      return NextResponse.json(
        {
          error:
            "MongoDB SSL connection error. Please check your MongoDB cluster whitelist, connection string, and network connectivity.",
          details: err.message,
        },
        { status: 500 }
      );
    }

    // If env var missing, return 500 with clear guidance
    if (err?.message?.includes("MONGODB_URI")) {
      return NextResponse.json(
        {
          error:
            "MONGODB_URI not configured. Add it to your environment (locally: .env.local, in Vercel: Project Settings → Environment Variables).",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
