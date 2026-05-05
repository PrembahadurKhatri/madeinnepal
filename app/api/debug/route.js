import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();
  const products = await Product.find({ pendingUpdate: { $ne: null } }).lean();
  return Response.json({ count: products.length, products });
}
