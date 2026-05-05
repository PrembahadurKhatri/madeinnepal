import { connectDB } from "../../../lib/mongodb";
import Checkout from "../../../models/Checkout";

export async function POST(req) {
  try {
    await connectDB();

    const { orderId, email } = await req.json();

    if (!orderId || !email) {
      return Response.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const order = await Checkout.findOne({
      orderId: orderId.trim(),
      email: email.trim(),
    });

    if (!order) {
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}