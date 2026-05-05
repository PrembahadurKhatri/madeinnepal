import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id);

    // ❗ check if product exists
    if (!product) {
      return Response.json({
        success: false,
        message: "Product not found"
      });
    }

    if (product.pendingUpdate) {
      // Rejecting an update on an existing product
      product.pendingUpdate = null;
      // Do not change status, keep it as "approved"
    } else if (product.status === "pending") {
      // Rejecting a new product entirely
      product.status = "rejected";
    } else {
      return Response.json({
        success: false,
        message: "No pending action to reject"
      });
    }

    await product.save();

    return Response.json({
      success: true,
      message: "Update request rejected"
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    });
  }
}