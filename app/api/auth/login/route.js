import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();

  const { username, email, password } = await req.json();

  // 1. Check missing fields
  if (!username || !email || !password) {
    return Response.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // 2. Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 400 }
    );
  }

  // 3. Check username match
  if (user.username !== username) {
    return Response.json(
      { error: "Invalid username" },
      { status: 400 }
    );
  }

  // 4. Check password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json(
      { error: "Invalid password" },
      { status: 400 }
    );
  }

  // 5. Create JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 6. Response
  return Response.json({
    token,
    role: user.role,
    userId: user._id,
    username: user.username,
    artisanId: user.artisanId || null,
  });
}