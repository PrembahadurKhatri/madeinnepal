import { connectDB } from "@/lib/mongodb";
import Artisan from "@/models/Artisan";
import Product from "@/models/Product";

export async function POST(req, { params }) {
  await connectDB();

  const { id } = await params; // ✅ FIX HERE

  await Artisan.findByIdAndUpdate(id, {
    status: "approved"
  });

  await Product.updateMany(
    { artisanId: id },
    { status: "approved" }
  );

  return Response.json({ success: true });
}