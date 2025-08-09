import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const phoneNumber = searchParams.get("phoneNumber");
    const orderId = searchParams.get("orderId");

    if (!phoneNumber || !orderId) {
      return NextResponse.json(
        { success: false, message: "Phone number and orderId required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection("users");
    const ordersCollection = db.collection("orders");
    const productsCollection = db.collection("products");

    const user = await usersCollection.findOne({ phone: phoneNumber }); // <-- Fixed line
    const order = await ordersCollection.findOne({ orderId: orderId });

    if (user && order) {
      // Fetch category and image for each productId
      const productIds = order.products.map((p) => p.productId);
      const productsData = await productsCollection
        .find({ productId: { $in: productIds } })
        .project({ productId: 1, category: 1, image: 1, _id: 0 })
        .toArray();

      // Map productId to details
      const productsMap = {};
      productsData.forEach((prod) => {
        productsMap[prod.productId] = prod;
      });

      // Add category and image to each product in order
      order.products = order.products.map((p) => ({
        ...p,
        category: productsMap[p.productId]?.category || "N/A",
        image: productsMap[p.productId]?.image || "",
      }));

      return NextResponse.json({ success: true, data: { user, order } });
    } else {
      return NextResponse.json(
        { success: false, message: "User or order not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching details:", error);
    return NextResponse.json(
      { success: false, error: "Internal error" },
      { status: 500 }
    );
  }
}


