"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { makers as staticMakers, allProducts as staticProducts } from "../market/page";
import Link from "next/link";

export default function NewArrivalsPage() {
  const { addToCart } = useCart();
  const [toast, setToast] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [combinedProducts, setCombinedProducts] = useState([]);

  useEffect(() => {
    fetch("/api/public/data")
      .then(res => res.json())
      .then(data => {
        if(data.success) {
           const mergedMakers = [...staticMakers, ...data.dbMakers];
           const mergedProducts = [...staticProducts, ...data.dbProducts];
           
           const enriched = mergedProducts.map((p) => {
             const maker = mergedMakers.find((m) => m.slug === p.artisan);
             return { ...p, maker };
           });
           
           // Sort by ID or creation date if available, but here we take the last 10
           const latest = [...enriched].slice(-10).reverse();
           setCombinedProducts(latest);
        }
      })
      .catch(() => {
         const enriched = staticProducts.map((p) => {
            const maker = staticMakers.find((m) => m.slug === p.artisan);
            return { ...p, maker };
          });
          setCombinedProducts([...enriched].slice(-10).reverse());
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(product.name);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen flex flex-col">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl z-50">
          🛒 Added: {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-5 py-10 w-full">
        <h1 className="text-4xl font-bold text-gray-800">
          🆕 New Arrivals
        </h1>
        <p className="text-gray-500 mt-2 mb-8">
          Fresh handmade products from Nepal 🇳🇵
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : combinedProducts.length === 0 ? (
            <div className="text-center py-24">
                <p className="text-gray-400">No new arrivals at the moment.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {combinedProducts.map((product) => (
                <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                >
                {/* IMAGE */}
                <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img
                    src={product.img}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-300"
                    />
                </div>

                {/* BODY */}
                <div className="p-4 flex flex-col flex-1">
                    {/* NAME */}
                    <h3 className="font-bold text-gray-800 text-base leading-snug">
                    {product.name}
                    </h3>

                    {/* DESCRIPTION */}
                    <div className="mt-1.5">
                    <p className="text-gray-500 text-xs leading-relaxed">
                        {expanded === product.id
                        ? product.desc
                        : product.desc?.length > 90
                        ? product.desc.slice(0, 90) + "..."
                        : product.desc}
                    </p>

                    {product.desc?.length > 90 && (
                        <button
                        onClick={() =>
                            setExpanded(expanded === product.id ? null : product.id)
                        }
                        className="text-[10px] text-red-500 mt-1 hover:underline"
                        >
                        {expanded === product.id ? "Show less" : "Read more"}
                        </button>
                    )}
                    </div>

                    {/* ARTISAN + LOCATION */}
                    {product.maker && (
                        <Link
                        href={`/artisan/${product.artisan}`}
                        className="flex items-center gap-2 mt-3 group/artisan"
                        >
                        <img
                            src={product.maker.img}
                            alt={product.maker.name}
                            className="w-7 h-7 rounded-full object-cover border-2 border-orange-100"
                        />
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-700 group-hover/artisan:text-red-500 transition truncate">
                            {product.maker.name}
                            </p>
                            <p className="text-[10px] text-gray-400 truncate">
                            📍 {product.maker.location} · {product.maker.province}
                            </p>
                        </div>
                        </Link>
                    )}

                    {/* PRICE + BUTTON */}
                    <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-orange-500 font-bold text-sm">
                        NPR {product.price?.toLocaleString()}
                    </span>

                    <button
                        onClick={() => handleAddToCart(product)}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold hover:scale-105 transition"
                    >
                        Add to Cart
                    </button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
      </div>

      <Footer />
    </div>
  );
}