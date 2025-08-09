import { getDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    const body = await req.json();
    const { orderId, phoneNumber } = body;
    const db = await getDatabase();
    const ordersCollection = db.collection('orders');

    const order = await ordersCollection.findOne({
      orderId: orderId,
      phone: phoneNumber,
    });

    if (order) {
      return NextResponse.json({ success: true, message: 'Order verified', order: order });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials!' }, { status: 401 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
