import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const products = db.products.getAll();
  return NextResponse.json(products);
}
