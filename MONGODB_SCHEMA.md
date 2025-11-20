# MongoDB Customer Inquiry Schema Documentation

## Overview
This document describes the MongoDB schema for storing customer inquiry form submissions from the website contact form.

## Collection Name
**`contacts`**

## Schema Definition

### TypeScript Interface

```typescript
interface CustomerInquiry {
  _id?: ObjectId;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  budget?: string | null;
  message: string;
  source: string;
  createdAt: Date;
  updatedAt?: Date;
  status?: "new" | "read" | "replied" | "archived";
  notes?: string;
  ipAddress?: string;
  userAgent?: string;
}
```

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique MongoDB document ID |
| `name` | String | ✅ Yes | Customer's full name (1-100 chars) |
| `email` | String | ✅ Yes | Customer's email address (validated) |
| `company` | String/Null | No | Company name (max 150 chars) |
| `phone` | String/Null | No | Phone number (max 20 chars) |
| `budget` | String/Null | No | Budget range: `10k-25k`, `25k-50k`, `50k-100k`, `100k+` |
| `message` | String | ✅ Yes | Inquiry message (1-5000 chars) |
| `source` | String | ✅ Yes | Source: `website-contact`, `email`, `phone`, `other` |
| `createdAt` | Date | ✅ Yes | Inquiry creation timestamp |
| `updatedAt` | Date | No | Last update timestamp |
| `status` | String | No | Status: `new`, `read`, `replied`, `archived` |
| `notes` | String | No | Admin notes (max 2000 chars) |
| `ipAddress` | String | No | Customer's IP address |
| `userAgent` | String | No | Browser user agent string |

## Indexes

The following indexes are created for optimal query performance:

```javascript
{
  "email": 1              // Single index on email
}
{
  "createdAt": -1         // Single index on createdAt (descending)
}
{
  "status": 1             // Single index on status
}
{
  "createdAt": -1,        // Compound index for filtering by date and status
  "status": 1
}
```

## Example Document

```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "phone": "+1-555-0123",
  "budget": "50k-100k",
  "message": "We need a website redesign. Please contact us for more details.",
  "source": "website-contact",
  "createdAt": ISODate("2024-11-19T10:30:00.000Z"),
  "updatedAt": ISODate("2024-11-19T11:00:00.000Z"),
  "status": "new",
  "notes": null,
  "ipAddress": "203.0.113.45",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
}
```

## Usage

### Setup Collection (One-time)

Run the setup script to create the collection with validation and indexes:

```bash
npm run setup:mongodb
```

Or manually:

```bash
npx ts-node scripts/setupMongoDB.ts
```

### Insert a Document

```typescript
import { MongoClient } from "mongodb";
import { CustomerInquiry } from "./models/CustomerInquiry";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("growsin");
const collection = db.collection<CustomerInquiry>("contacts");

const inquiry: CustomerInquiry = {
  name: "Jane Smith",
  email: "jane@example.com",
  company: "Tech Solutions",
  phone: "+1-555-0456",
  budget: "25k-50k",
  message: "Interested in your services",
  source: "website-contact",
  createdAt: new Date(),
  status: "new"
};

const result = await collection.insertOne(inquiry);
console.log("Inserted ID:", result.insertedId);
```

### Query Examples

#### Find all new inquiries (most recent first)

```typescript
const newInquiries = await collection
  .find({ status: "new" })
  .sort({ createdAt: -1 })
  .toArray();
```

#### Find inquiries from the last 7 days

```typescript
const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
const recentInquiries = await collection
  .find({ createdAt: { $gte: sevenDaysAgo } })
  .sort({ createdAt: -1 })
  .toArray();
```

#### Find by email

```typescript
const inquiry = await collection.findOne({ email: "john@example.com" });
```

#### Update inquiry status

```typescript
await collection.updateOne(
  { _id: ObjectId("...") },
  { 
    $set: { 
      status: "replied", 
      updatedAt: new Date(),
      notes: "Responded via email"
    }
  }
);
```

#### Count inquiries by status

```typescript
const counts = await collection.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
]).toArray();
```

## Environment Variables

Add these to your `.env.local` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=growsin
```

## Validation

The collection has MongoDB schema validation enabled. It enforces:

- All required fields must be present
- Email must be a valid email format
- Budget must be one of the allowed values
- String length constraints
- Data type validation

Any insert/update that violates the schema will be rejected with a validation error.

## Files

- `models/CustomerInquiry.ts` - TypeScript interface and schema definition
- `models/mongoSetup.ts` - Collection setup and initialization functions
- `scripts/setupMongoDB.ts` - Setup script
- `app/api/contact/route.ts` - API endpoint using the schema

## Notes

- All timestamps are stored in UTC
- The `_id` field is automatically generated by MongoDB
- Optional fields can be `null` or omitted
- Consider archiving old inquiries for better performance
