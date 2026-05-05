import { connectDB } from "../../../lib/mongodb";
import Return from "../../../models/Return";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { orderId, email, reason } = body;

    // Validation
    if (!orderId || !email || !reason) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const request = await Return.create({
      orderId,
      email,
      reason, // ✅ FIXED
    });

    return Response.json(
      { success: true, data: request },
      { status: 201 }
    );

  } catch (error) {
    console.log("Return Api Error:", error);

    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}