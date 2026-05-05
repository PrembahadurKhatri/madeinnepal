import { connectDB } from "@/lib/mongodb";
import Checkout from "@/models/Checkout";

export async function PUT(request) {
  try {
    await connectDB();
    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return Response.json({ success: false, message: "Order ID and status are required" }, { status: 400 });
    }

    const updatedOrder = await Checkout.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return Response.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return Response.json({ success: true, order: updatedOrder }, { status: 200 });

  } catch (error) {
    console.error("Update Status Error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
