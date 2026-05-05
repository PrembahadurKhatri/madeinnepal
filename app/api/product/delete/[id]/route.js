import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return Response.json({ success: false, message: "Product not found" });
        }

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}