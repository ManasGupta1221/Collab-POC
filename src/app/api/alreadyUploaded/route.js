import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const productIdsRaw = searchParams.get("productIds"); // comma-separated productIds

  if (!orderId || !productIdsRaw) {
    return NextResponse.json({ error: "Missing orderId or productIds" }, { status: 400 });
  }

  const productIds = productIdsRaw.split(",");
  const db = await getDatabase();

  let videos = [];

  for (const productId of productIds) {
    const file = await db
      .collection(`${productId}_Videos.files`)
      .findOne({ "metadata.orderId": orderId });
    if (file) {
      videos.push({ ...file, productId });
    }
  }

  return NextResponse.json({ videos });
}
