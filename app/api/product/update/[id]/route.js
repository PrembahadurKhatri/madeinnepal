import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const body = await req.json();

        const updated = await Product.findByIdAndUpdate(
            id,
            {
                pendingUpdate: body // ✅ store request
            },
            { new: true } // ✅ correct position
        );

        if (!updated) {
            return Response.json({
                success: false,
                message: "Product not found"
            });
        }

        return Response.json({
            success: true,
            message: "Update request sent to admin",
            product: updated
        });

    } catch (error) {
        return Response.json({
            success: false,
            error: error.message
        });
    }
}