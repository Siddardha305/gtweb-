import { ObjectId } from "mongodb";

/**
 * MongoDB Schema for Customer Inquiry Form
 * Collection: contacts
 */

export interface CustomerInquiry {
  _id?: ObjectId;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  budget?: string | null;
  message: string;
  source: string; // e.g., "website-contact"
  createdAt: Date;
  updatedAt?: Date;
  status?: "new" | "read" | "replied" | "archived"; // Optional status field
  notes?: string; // Optional admin notes
  ipAddress?: string; // Optional tracking field
  userAgent?: string; // Optional tracking field
}

/**
 * MongoDB Collection Schema Definition
 * Use this JSON schema for validation at the database level
 */
export const customerInquiryCollectionSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "email", "message", "source", "createdAt"],
    properties: {
      _id: {
        bsonType: "objectId",
        description: "Unique identifier for the inquiry",
      },
      name: {
        bsonType: "string",
        minLength: 1,
        maxLength: 100,
        description: "Full name of the customer",
      },
      email: {
        bsonType: "string",
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        description: "Email address of the customer",
      },
      company: {
        bsonType: ["string", "null"],
        maxLength: 150,
        description: "Company name (optional)",
      },
      phone: {
        bsonType: ["string", "null"],
        maxLength: 20,
        description: "Phone number (optional)",
      },
      budget: {
        bsonType: ["string", "null"],
        enum: [
          null,
          "10k-25k",
          "25k-50k",
          "50k-100k",
          "100k+",
        ],
        description: "Budget range for the project",
      },
      message: {
        bsonType: "string",
        minLength: 1,
        maxLength: 5000,
        description: "Customer inquiry message",
      },
      source: {
        bsonType: "string",
        enum: ["website-contact", "email", "phone", "other"],
        description: "Source of the inquiry",
      },
      createdAt: {
        bsonType: "date",
        description: "Timestamp when inquiry was created",
      },
      updatedAt: {
        bsonType: ["date", "null"],
        description: "Timestamp when inquiry was last updated",
      },
      status: {
        bsonType: ["string", "null"],
        enum: [null, "new", "read", "replied", "archived"],
        description: "Status of the inquiry",
      },
      notes: {
        bsonType: ["string", "null"],
        maxLength: 2000,
        description: "Admin notes about the inquiry",
      },
      ipAddress: {
        bsonType: ["string", "null"],
        description: "IP address of the requester",
      },
      userAgent: {
        bsonType: ["string", "null"],
        description: "User agent string from the requester",
      },
    },
  },
};

/**
 * Recommended MongoDB Indexes for optimal query performance
 */
export const recommendedIndexes = [
  { name: "email_index", key: { email: 1 } },
  { name: "createdAt_index", key: { createdAt: -1 } },
  { name: "status_index", key: { status: 1 } },
  { name: "createdAt_status_index", key: { createdAt: -1, status: 1 } },
];
