import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req,{params}) {
await connectDB();
const {id} = await params;
const product = await Product.findById(id);
return Response.json(product);    
}