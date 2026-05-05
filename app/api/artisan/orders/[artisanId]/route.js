import { connectDB } from "@/lib/mongodb";
import Checkout from "@/models/Checkout";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { artisanId } = await params;

    if (!artisanId) {
      return Response.json({ success: false, message: "Artisan ID required" }, { status: 400 });
    }

    console.log("Fetching orders for Artisan ID:", artisanId);

    // Find all checkouts where at least one item matches this artisanId
    const allOrders = await Checkout.find({
      "items.artisan": artisanId
    }).sort({ createdAt: -1 });

    console.log(`Found ${allOrders.length} matching orders`);

    // Format orders for the artisan (show only their products)
    const formattedOrders = allOrders.map(order => {
      const artisanItems = order.items.filter(item => item.artisan === artisanId);
      const artisanTotal = artisanItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        _id: order._id,
        orderId: order.orderId,
        customerName: order.name,
        customerEmail: order.email,
        location: order.location,
        province: order.province,
        status: order.status,
        createdAt: order.createdAt,
        items: artisanItems,
        artisanTotal: artisanTotal
      };
    });

    return Response.json({ success: true, orders: formattedOrders }, { status: 200 });

  } catch (error) {
    console.error("Artisan Orders Error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
