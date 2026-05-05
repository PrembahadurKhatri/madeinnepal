"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { allProducts, makers } from "../../market/page";

const categories = [
  { id: 1, name: "Handicraft", slug: "handicraft", img: "/dalo.jpg" },
  { id: 2, name: "Textiles & Garments", slug: "textiles-garments", img: "/pashminas.jpg" },
  { id: 3, name: "Ceramics", slug: "ceramics", img: "/ceramic.webp" },
  { id: 4, name: "Home Decors", slug: "home-decors", img: "/homedecor.png" },
  { id: 5, name: "Agricultural Products", slug: "agricultural-products", img: "/agricultures.png" },
  { id: 6, name: "Leather Goods", slug: "leather-goods", img: "/leather.jpg" },
  { id: 7, name: "Herbal & Wellness", slug: "herbal-wellness", img: "/tokla.jpeg" },
  { id: 9, name: "Dairy & Sweets", slug: "dairy-sweets", img: "/agriculture.jpg" },
  { id: 10, name: "Paper and Eco Friendly", slug: "paper-eco-friendly", img: "/paper.webp" },
];

// Join products with artisan info
const enrichedProducts = allProducts.map((p) => {
  const maker = makers.find((m) => m.slug === p.artisan);
  return { ...p, maker };
});

export default function CategoryPage() {
  const { slug } = useParams();
  const { cart, addToCart } = useCart();
  const [toast, setToast] = useState(null);
  const [combinedProducts, setCombinedProducts] = useState(enrichedProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/data")
      .then(res => res.json())
      .then(data => {
        if(data.success) {
           const mergedMakers = [...makers, ...data.dbMakers];
           const mergedProducts = [...allProducts, ...data.dbProducts];
           
           const enriched = mergedProducts.map((p) => {
             const maker = mergedMakers.find((m) => m.slug === p.artisan);
             return { ...p, maker };
           });
           setCombinedProducts(enriched);
        }
      })
      .catch(() => {
         setCombinedProducts(enrichedProducts);
      })
      .finally(() => setLoading(false));
  }, []);

  const categoryInfo = categories.find((c) => c.slug === slug);
  const categoryProducts = combinedProducts.filter((p) => p.category === slug);

  if (!categoryInfo) {
    return (
      <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800">Category not found</h1>
          <Link href="/categories" className="text-orange-500 hover:underline mt-4">
            ← Back to Categories
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(product.name);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen flex flex-col">
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

      <div className="max-w-7xl mx-auto px-5 py-12 flex-1 w-full">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 capitalize">
            {categoryInfo.name}
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Discover our collection of {categoryInfo.name.toLowerCase()} handcrafted by Nepali artisans
          </p>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-6 border-b pb-4">
          Showing <span className="font-semibold text-gray-700">{categoryProducts.length}</span> products
        </p>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : categoryProducts.length === 0 ? (
          <div className="flex flex-col items-center py-24 gap-3 text-center">
            <span className="text-6xl">🔍</span>
            <h2 className="text-xl font-bold text-gray-600">No products found for this category</h2>
            <Link href="/categories" className="text-orange-500 hover:underline mt-4">
              ← Back to Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => {
              const cartItem = cart.find(item => item.id === product.id);
              const remainingStock = (product.stock || 0) - (cartItem ? cartItem.quantity : 0);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="h-48 bg-gray-50 overflow-hidden flex items-center justify-center relative">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-800 text-base leading-snug">{product.name}</h3>
                    <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 flex-1">
                      {product.desc}
                    </p>

                    {/* Artisan Info */}
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

                    {/* Price + Cart */}
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-orange-500 font-bold text-sm">
                          NPR {Number(product.price || 0).toLocaleString()}
                        </span>
                        <span className={`text-xs font-medium ${remainingStock <= 0 ? 'text-red-500' : 'text-gray-400'}`}>
                          {remainingStock <= 0 ? "Out of Stock" : `Stock: ${remainingStock}`}
                        </span>
                      </div>
                      <button
                        onClick={() => remainingStock > 0 && handleAddToCart(product)}
                        disabled={remainingStock <= 0}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition shadow-sm ${remainingStock <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105'}`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {remainingStock <= 0 ? "No Stock" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
