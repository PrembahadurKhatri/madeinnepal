import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
export async function GET() {
    await connectDB();
    const products = await Product.find().sort({createAt:-1});
    return Response.json(products);
}