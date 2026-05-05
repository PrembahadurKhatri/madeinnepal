import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function PUT(req, { params }) {
  await connectDB();

  const { id } = await params;

  const product = await Product.findById(id);

  if (!product) {
    return Response.json({ success: false, message: "Product not found" });
  }

  // If there's a pending update, apply it
  if (product.pendingUpdate) {
    if (product.pendingUpdate.name) product.name = product.pendingUpdate.name;
    if (product.pendingUpdate.description) product.description = product.pendingUpdate.description;
    if (product.pendingUpdate.price) product.price = product.pendingUpdate.price;
    if (product.pendingUpdate.category) product.category = product.pendingUpdate.category;
    if (product.pendingUpdate.stock !== undefined) product.stock = product.pendingUpdate.stock;
    if (product.pendingUpdate.image) product.image = product.pendingUpdate.image;
    
    product.pendingUpdate = null;
  }

  // Always set status to approved (handles new pending products and updates)
  product.status = "approved";

  await product.save();

  return Response.json({ success: true });
}