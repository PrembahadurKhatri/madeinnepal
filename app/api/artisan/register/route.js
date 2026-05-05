import { connectDB } from "@/lib/mongodb";
import Artisan from "@/models/Artisan";
import Product from "@/models/Product";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // basic validation
    if (!body.name || !body.email || !body.username || !body.password) {
      return Response.json(
        { success: false, message: "Missing required fields including username and password" },
        { status: 400 }
      );
    }

    // check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email: body.email }, { username: body.username }] 
    });
    
    if (existingUser) {
      return Response.json(
        { success: false, message: "Username or Email already exists" },
        { status: 400 }
      );
    }

    // create artisan
    const artisan = await Artisan.create({
      name: body.name,
      email: body.email,
      location: body.location,
      province: body.province,
      description: body.description,
      image: body.artisanImage,
      status:"pending"
    });

    // create product linked to artisan
    const product = await Product.create({
      artisanId: artisan._id,
      name: body.productName,
      description: body.productDescription,
      category: body.category,
      stock: body.stock,
      price: body.price,
      image: body.productImage,
      status:"pending"
    });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // create User
    const user = await User.create({
      username: body.username,
      email: body.email,
      password: hashedPassword,
      role: "artisan",
      artisanId: artisan._id
    });

    return Response.json({
      success: true,
      artisan,
      product,
      user: { id: user._id, username: user.username }
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}