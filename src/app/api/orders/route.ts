import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = db.orders.getAll();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Basic validation/creation logic
  const newOrder = {
    id: `ORD-${Math.floor(Math.random() * 10000)}`,
    createdAt: new Date().toISOString(),
    status: "Order Received",
    ...body,
  };

  db.orders.add(newOrder);
  return NextResponse.json(newOrder, { status: 201 });
}
