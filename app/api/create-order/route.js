import { connectDB } from "../../../lib/mongodb";
import Checkout from "../../../models/Checkout";
import Product from "../../../models/Product";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,       // ✅ added
      email,
      location,   // ✅ added
      province,   // ✅ added
      items,
      total
    } = body;

    // ✅ validation
    if (!name || !email || !location || !province || !items || !total) {
      return Response.json(
        { success: false, message: "All fields required ❌" },
        { status: 400 }
      );
    }

    // ✅ better orderId
    const orderId = "ORD-" + Date.now();

    // 1. Create the order
    const order = await Checkout.create({
      orderId,
      name,       // ✅ save
      email,
      location,   // ✅ save
      province,   // ✅ save
      items,
      total,
      status: "pending",   // ✅ useful for tracking
    });

    // 2. Update product stocks
    for (const item of items) {
      // Find product by ID and decrement stock
      // Assuming item has an 'id' or '_id' field
      const productId = item.id || item._id;
      if (productId) {
        await Product.findByIdAndUpdate(productId, {
          $inc: { stock: -item.quantity }
        });
      }
    }

    return Response.json(
      {
        success: true,
        orderId,
        order,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}