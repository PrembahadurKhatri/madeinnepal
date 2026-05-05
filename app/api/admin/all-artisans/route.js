import { connectDB } from "@/lib/mongodb";
import Artisan from "@/models/Artisan";

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();
  const artisans = await Artisan.find({ status: { $ne: "pending" } }).sort({ createdAt: -1 });
  return Response.json({ success: true, artisans });
}
