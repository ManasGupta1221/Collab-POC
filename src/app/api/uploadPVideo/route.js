import { NextResponse } from "next/server";
import { MongoClient, GridFSBucket } from "mongodb";
import { Readable } from "stream";
export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(req) {
  const formData = await req.formData(); // Parse incoming form data
  const file = formData.get("file");
  const productId = formData.get("productId");
  const username = formData.get("username");
  const userId = formData.get("userId");
  const orderId = formData.get("orderId");
  const istTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("LEVIS");

    const bucket = new GridFSBucket(db, {
      bucketName: `${productId}_Videos`,
    });

    const uploadStream = bucket.openUploadStream(file.name, {
      contentType: file.type,
      metadata: {
        uploadedAtIST: istTime,
        uploadedBy: username,
        userId: userId,
        orderId: orderId,
        productId: productId,
      },
    });
    const fileId = uploadStream.id; // Get the file ID from GridFS

    const readableStream = Readable.from(buffer); // Create a readable stream from buffer
    readableStream.pipe(uploadStream); // Pipe the file data into GridFS
    // Wait for the upload to finish or error
    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve); // Resolve when upload finishes
      uploadStream.on("error", reject); // Reject if there's an error
    });

    // Fetch the uploaded video document
    const videoDoc = await db
      .collection(`${productId}_Videos.files`)
      .findOne({ _id: fileId });

    return NextResponse.json({
      message: "Video uploaded",
      video: videoDoc, // <-- return the full video document
    });
  } catch (err) {
    // Handle errors and respond
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed", detail: err.message },
      { status: 500 }
    );
  }
}
