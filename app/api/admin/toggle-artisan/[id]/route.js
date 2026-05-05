import { connectDB } from "@/lib/mongodb";
import Artisan from "@/models/Artisan";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;

  const artisan = await Artisan.findById(id);
  if (!artisan) {
    return Response.json({ success: false, error: "Artisan not found" }, { status: 404 });
  }

  // Determine new status
  const newStatus = artisan.status === "approved" ? "deactivated" : "approved";

  // Use findByIdAndUpdate with runValidators: false to avoid cached schema enum issues
  const updated = await Artisan.findByIdAndUpdate(
    id,
    { $set: { status: newStatus } },
    { new: true, runValidators: false }
  );

  return Response.json({ success: true, artisan: updated });
}
