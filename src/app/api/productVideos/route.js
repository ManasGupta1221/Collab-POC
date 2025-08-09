import { NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import { getDatabase } from "@/lib/mongodb";  
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("ProductId");
  if (!productId) {
    return NextResponse.json({ error: "ProductId is required" }, { status: 400 });
  }

  const db = await getDatabase();
  const bucket = new GridFSBucket(db, { bucketName: `${productId}_Videos` });

  // List all files in the bucket
  const files = await db.collection(`${productId}_Videos.files`).find({}).toArray();

  // Return file info (you can add more fields if needed)
  return NextResponse.json({ files });
}