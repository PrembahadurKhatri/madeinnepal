"use client";
import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export const makers = [];

export const allProducts = [];

// Dynamic processing moved inside the component

const SORT_OPTIONS = [
  { label: "Default",        value: "default" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Name A–Z",       value: "name_asc" },
];

export default function MarketPage() {
  const { cart, addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [toast, setToast] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [combinedProducts, setCombinedProducts] = useState([]);
  const [combinedMakers, setCombinedMakers] = useState(makers);
  const [loading,setLoading]=useState(true);

  const provinces = ["All", ...new Set(combinedMakers.map((m) => m.province))];

  useEffect(() => {
    fetch("/api/public/data")
      .then(res => res.json())
      .then(data => {
        if(data.success) {
           const mergedMakers = [...makers, ...data.dbMakers];
           const mergedProducts = [...allProducts, ...data.dbProducts];
           
           setCombinedMakers(mergedMakers);

           const enriched = mergedProducts.map((p) => {
             const maker = mergedMakers.find((m) => m.slug === p.artisan);
             return { ...p, maker };
           });
           setCombinedProducts(enriched);
        }
      })
      .catch(() => {
         const enriched = allProducts.map((p) => {
             const maker = makers.find((m) => m.slug === p.artisan);
             return { ...p, maker };
         });
         setCombinedProducts(enriched);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(product.name);
    setTimeout(() => setToast(null), 2500);
  
  };

  let filtered = combinedProducts.filter((p) => {
    const matchSearch =
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.maker?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.maker?.location || "").toLowerCase().includes(search.toLowerCase());
    const matchProvince =
      selectedProvince === "All" || p.maker?.province === selectedProvince;
    return matchSearch && matchProvince;
  });

  // Sort
  if (sort === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);// Sort by price low to high
  if (sort === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);// Sort by price high to low
  if (sort === "name_asc") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));// Sort by name A-Z

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen flex flex-col">
      <Navbar />

      {/* Toast */}
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
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            🛍️ Marketplace
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Discover {combinedProducts.length} authentic products handcrafted by Nepali artisans
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, artisans, locations..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-400 text-sm shadow-sm"
            />
          </div>

          {/* Province Filter */}
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
          >
            {provinces.map((p) => (
              <option key={p} value={p}>{p === "All" ? "All Provinces" : p}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-6">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> products
        </p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 gap-3 text-center">
            <span className="text-6xl">🔍</span>
            <h2 className="text-xl font-bold text-gray-600">No products found</h2>
            <p className="text-gray-400 text-sm">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* ✅ SKELETON */}
         {loading &&
  Array.from({ length: filtered.length || allProducts.length || 8 }).map((_, i) => (
    <div key={i} className="animate-pulse bg-white p-4 rounded-xl shadow">
      <div className="h-40 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 mt-3 w-3/4"></div>
      <div className="h-3 bg-gray-200 mt-2 w-1/2"></div>
    </div>
  ))
}

            {filtered.map((product) => {
              const cartItem = cart.find(item => item.id === product.id);
              const remainingStock = (product.stock || 0) - (cartItem ? cartItem.quantity : 0);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
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
                  {/* Product Name */}
                  <h3 className="font-bold text-gray-800 text-base leading-snug">{product.name}</h3>

                  {/* Description */}
               <div className="mt-1.5">
  <p className="text-gray-500 text-xs leading-relaxed">
    {expanded === product.id
      ? product.desc
      : product.desc.length > 90
        ? product.desc.slice(0, 90) + "..."
        : product.desc}
  </p>

  {product.desc.length > 90 && (
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
                      <span className={`text-[10px] font-medium ${remainingStock <= 0 ? 'text-red-500' : 'text-gray-400'}`}>
                        {remainingStock <= 0 ? "Out of Stock" : `Stock: ${remainingStock}`}
                      </span>
                    </div>
                    <button
                      onClick={() => remainingStock > 0 && handleAddToCart(product)}
                      disabled={remainingStock <= 0}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition shadow-sm ${remainingStock <= 0 ? 'bg-gray-400 cursor-not-allowed opacity-70' : 'bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105'}`}
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
