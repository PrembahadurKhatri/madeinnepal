"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { useCart } from "../../context/CartContext";

// ✅ Static Makers (fallback)
const staticMakers: any[] = [];

// ✅ Static Products (fallback)
const staticProducts: any[] = [];

export default function ProvincePage() {
  const { cart, addToCart }: any = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const params = useParams();
  const slug = ((Array.isArray(params?.slug) ? params.slug[0] : params?.slug) || "").toLowerCase();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [allProducts, setAllProducts] = useState<any[]>(staticProducts);
  const [allMakers, setAllMakers] = useState<any[]>(staticMakers);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch DB artisans + products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/public/data");
        const data = await res.json();

        if (data.success) {
          // Build dynamic makers from DB (province normalised to lowercase)
          const dbMakers = (data.dbMakers || []).map((a: any) => ({
            slug: a.id,           // DB artisans use their _id as slug
            province: (a.province || "").toLowerCase(),
            isDB: true,
          }));

          // Build dynamic products from DB (artisan field = artisanId string)
          const dbProducts = (data.dbProducts || []).map((p: any) => ({
            id: `db-${p.id}`,
            name: p.name,
            category: p.category || "handicraft",
            img: p.img,
            price: p.price,
            artisan: p.artisan, // this is the artisanId string
            stock: p.stock,
            isDB: true,
          }));

          // Merge: static first, then DB (no duplicates needed)
          setAllMakers([...staticMakers, ...dbMakers]);
          setAllProducts([...staticProducts, ...dbProducts]);
        }
      } catch (e) {
        console.error("Failed to fetch province data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Filter products by province
  const filteredProducts = allProducts.filter((product) => {
    const maker = allMakers.find((m) => m.slug === product.artisan);
    return (
      maker?.province === slug &&
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || product.category === category)
    );
  });

  const categories = ["all", ...new Set(allProducts.map((p: any) => p.category))];

  const handleAddtoCart = (product: any) => {
    addToCart(product);
    setToast(product.name);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl animate-slide-up">
          <span className="text-xl">🛒</span>
          <div>
            <p className="text-xs text-gray-400">Added to cart</p>
            <p className="font-semibold text-sm">{toast}</p>
          </div>
          <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full ml-2" />
        </div>
      )}

      {/* 🔥 HEADER */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
          {slug.toUpperCase()} PRODUCTS
        </h1>
        <p className="text-gray-500 mt-2">Explore local products from this province</p>
      </div>

      {/* 🔍 FILTER BAR */}
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 px-4 py-2 rounded-full border focus:ring-2 focus:ring-red-400"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-red-400"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* 🛍️ GRID */}
      <div className="max-w-7xl mx-auto px-5 pb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 flex-1">
        {loading ? (
          <div className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/60 p-4 rounded-2xl h-64">
                <div className="bg-gray-200 h-40 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 w-3/4 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <h2 className="text-xl text-gray-500">😢 No products found in this province</h2>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const cartItem = cart.find((item: any) => item.id === product.id);
            const remainingStock = (product.stock || 0) - (cartItem ? cartItem.quantity : 0);
            return (
              <div
                key={product.id}
                className="group bg-white/60 backdrop-blur-xl border rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-3"
              >
              {/* IMAGE */}
              <div className="overflow-hidden rounded-xl relative h-40">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                {product.isDB && (
                  <span className="absolute top-2 left-2 z-10 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    NEW
                  </span>
                )}
              </div>

              {/* INFO */}
              <div className="mt-3">
                <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full inline-block mt-1">
                  {product.category}
                </span>
                <p className="text-red-500 font-bold mt-2">
                  NPR {product.price.toLocaleString()}
                </p>
                <p className={`text-[10px] font-medium mt-1 ${remainingStock <= 0 ? 'text-red-500' : 'text-gray-400'}`}>
                  {remainingStock <= 0 ? "Out of Stock" : `Stock: ${remainingStock}`}
                </p>
                <button
                  onClick={() => remainingStock > 0 && handleAddtoCart(product)}
                  disabled={remainingStock <= 0}
                  className={`mt-3 w-full py-2 rounded-full transition flex items-center justify-center gap-2 ${remainingStock <= 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-orange-400 text-white hover:scale-105'}`}
                >
                  {remainingStock <= 0 ? "❌ No Stock" : "🛒 Add to Cart"}
                </button>
              </div>
                </div>
              );
            })
        )}
      </div>

      <Footer />
    </div>
  );
}