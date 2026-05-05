import { connectDB } from "@/lib/mongodb";
import Artisan from "@/models/Artisan";
import Product from "@/models/Product";

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();

  const artisans = await Artisan.find({ status: "pending" });

  // 🔥 attach product to each artisan
  const artisanData = await Promise.all(
    artisans.map(async (artisan) => {
      const product = await Product.findOne({
        artisanId: artisan._id
      });

      return {
        ...artisan.toObject(),
        product
      };
    })
  );

  // 🔥 get pending products for already approved artisans OR products with pending updates
  const pendingArtisanIds = artisans.map(a => a._id.toString());
  const allPendingProducts = await Product.find({ 
    $or: [
      { status: "pending" },
      { pendingUpdate: { $ne: null } }
    ]
  });
  
  const standaloneProducts = await Promise.all(
    allPendingProducts
      .filter(p => !pendingArtisanIds.includes(p.artisanId.toString()))
      .map(async (product) => {
        const artisan = await Artisan.findById(product.artisanId);
        return {
          ...product.toObject(),
          artisan: artisan ? artisan.toObject() : null
        };
      })
  );

  return Response.json({ success: true, artisans: artisanData, products: standaloneProducts });
}