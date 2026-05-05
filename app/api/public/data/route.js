import { connectDB } from "@/lib/mongodb";
import Artisan from "@/models/Artisan";
import Product from "@/models/Product";

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();
  
  const artisans = await Artisan.find({ status: "approved" }).lean();
  
  const dbMakers = artisans.map(a => ({
    id: a._id.toString(),
    name: a.name,
    slug: a._id.toString(),
    location: a.location || "Nepal",
    province: a.province || "Bagmati",
    desc: a.description || "",
    img: a.image || "/placeholder-artisan.jpg"
  }));

  const products = await Product.find({ 
    status: "approved",
    artisanId: { $in: artisans.map(a => a._id) }
  }).lean();
  
  const dbProducts = products.map(p => ({
    id: p._id.toString(),
    name: p.name,
    category: p.category || "handicraft", 
    img: p.image || "/placeholder-product.jpg",
    price: p.price,
    stock: p.stock,
    artisan: p.artisanId ? p.artisanId.toString() : "unknown",
    desc: p.description || ""
  }));

  return Response.json({ success: true, dbMakers, dbProducts });
}
