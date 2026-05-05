import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        
        const { name, price, category, description, stock, image, artisanId } = body;

        if (!name || !price || !category || !artisanId || !image) {
            return Response.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const product = await Product.create({
            artisanId, 
            name, 
            price,
            category,
            description, 
            stock, 
            image, 
            status: "pending"
        });

        return Response.json({ success: true, product });
    } catch (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}