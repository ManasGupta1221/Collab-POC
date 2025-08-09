import { GridFSBucket } from "mongodb";
import {getDatabase} from "@/lib/mongodb";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("ProductId");
  const filename = searchParams.get("filename");
  const username = searchParams.get("username");
  if (!productId || !filename) return new Response("Missing params", { status: 400 });

  const db = await getDatabase();
  const bucket = new GridFSBucket(db, { bucketName: `${productId}_Videos` });

  const files = await db.collection(`${productId}_Videos.files`).find({ filename }).toArray();
  if (!files.length) return new Response("File not found", { status: 404 });

  const stream = bucket.openDownloadStreamByName(filename);
  return new Response(stream, {
    headers: {
      "Content-Type": files[0].contentType || "video/mp4",
    },
  });
} 