import { GridFSBucket, ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const productId = searchParams.get("productId");

  if (!id || !productId) return new Response("Missing id or productId", { status: 400 });

  const db = await getDatabase();
  const bucket = new GridFSBucket(db, { bucketName: `${productId}_Videos` });

  let fileId;
  try {
    fileId = new ObjectId(id);
  } catch {
    return new Response("Invalid file id", { status: 400 });
  }

  const files = await db.collection(`${productId}_Videos.files`).find({ _id: fileId }).toArray();
  if (!files.length) return new Response("File not found", { status: 404 });

  const nodeStream = bucket.openDownloadStream(fileId);

  // Convert Node.js stream to Web ReadableStream
  const webStream = new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => controller.enqueue(chunk));
      nodeStream.on("end", () => controller.close());
      nodeStream.on("error", (err) => controller.error(err));
    },
    cancel() {
      nodeStream.destroy();
    },
  });

  return new Response(webStream, {
    headers: {
      "Content-Type": files[0].contentType || "video/mp4",
      "Content-Disposition": `inline; filename="${files[0].filename}"`,
    },
  });
}