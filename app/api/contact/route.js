import { connectDB } from "../../../lib/mongodb";
import Contact from "../../../models/Contact";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    let { name, email, message } = body;

    // Trim inputs
    name = name?.trim();
    email = email?.trim();
    message = message?.trim();

    // Validation
    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      );
    }

    // Save to DB
    const newMessage = await Contact.create({
      name,
      email,
      message,
    });

    return Response.json(
      { success: true, message: "Message sent successfully", data: newMessage },
      { status: 201 }
    );

  } catch (error) {
    return Response.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}