import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { artisanId } = await params;

    const products = await Product.find({ artisanId }).sort({ createdAt: -1 });

    return Response.json({ success: true, products });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
