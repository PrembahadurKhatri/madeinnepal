import { connectDB } from "../../../lib/mongodb";
import Shipping from "../../../models/Shipping";

export async function POST(req) {
  try {
    // connect to database
    await connectDB();

    // get request data
    const body = await req.json();
    const { name, email, phone, address } = body;

    // validation
    if (!name || !email || !phone || !address) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // save to MongoDB
    const order = await Shipping.create({
      name,
      email,
      phone,
      address,
    });

    // success response
    return Response.json(
      { success: true, data: order },
      { status: 201 }
    );
  } catch (error) {
    console.log("Shipping API Error:", error);

    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}