"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./context/CartContext";
// Removed hardcoded products import


export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { cart, addToCart }: any = useCart();
  const [toast, setToast] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setToast(product.name);
    setTimeout(() => setToast(null), 2500);
  };

  const [dbMakers, setDbMakers] = useState<any[]>([]);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/data")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDbMakers(data.dbMakers);
          setDbProducts(data.dbProducts);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const featuredProducts = dbProducts.slice(0, 8).map(p => {
    const maker = dbMakers.find(m => m.slug === p.artisan);
    return { ...p, maker };
  });

  useEffect(() => {
    // Unconditionally play the video when the homepage is mounted
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle auto-play policies gently
      });
    }
  }, []);


  return (
    <div className="relative">
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

      {/* Video Section */}
      <div className="relative w-full h-screen">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/ad.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/60 via-transparent flex flex-col items-center justify-center text-center px-4">

          {/* Subtle Badge */}
          <span className="mb-6 inline-block py-1.5 px-5 rounded-full bg-red-500/10 border border-red-500/20 text-red-50 text-sm font-medium tracking-widest uppercase backdrop-blur-md transition-colors hover:bg-red-500/20 cursor-default">
            Supporting independent creators over Nepal
          </span>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif tracking-tight drop-shadow-xl max-w-4xl">
            Nepali goods with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 italic">soul.</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-10 drop-shadow-md font-light leading-relaxed">
            Discover the finest products made in Nepal — where tradition meets innovation.
            From everyday essentials to unique creations, every purchase supports local businesses and celebrates true Nepali identity.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transform hover:-translate-y-0.5">
            <Link href="/market"> Shop the Market</Link>
            </button>
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-medium py-3.5 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-0.5">
            <Link href="/artisan"> Meet the Makers</Link> 
            </button>
          </div>
        </div>
      </div>
      {/* Trust & Stats Bar */}
      <div className="relative z-10 -mt-20 mx-auto max-w-5xl px-4 sm:px-6 mb-24">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white p-8 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-transparent md:divide-gray-100">

            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1 group-hover:bg-red-100 group-hover:shadow-sm">
                <img src="person.png" alt="products" className="w-8 h-8 object-contain opacity-80" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight mb-1">{dbMakers.length}</h3>
              <p className="text-xs sm:text-sm font-bold text-gray-500 tracking-widest uppercase">Nepali Vendor</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1 group-hover:bg-orange-100 group-hover:shadow-sm">
                <img src="unique.svg" alt="unique" className="w-8 h-8 object-contain opacity-80" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight mb-1">{dbProducts.length}</h3>
              <p className="text-xs sm:text-sm font-bold text-gray-500 tracking-widest uppercase">Unique Items</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1 group-hover:bg-amber-100 group-hover:shadow-sm">
                <img src="ratings.svg" alt="rating" className="w-8 h-8 object-contain opacity-80" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight mb-1">4.9/5</h3>
              <p className="text-xs sm:text-sm font-bold text-gray-500 tracking-widest uppercase">Avg Ratings</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1 group-hover:bg-rose-100 group-hover:shadow-sm">
                <img src="increase.png" alt="up" className="w-8 h-8 object-contain opacity-80" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight mb-1">99%</h3>
              <p className="text-xs sm:text-sm font-bold text-gray-500 tracking-widest uppercase">Happy Customers</p>
            </div>

          </div>
        </div>
      </div>
      {/* Shop by Category Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32 mt-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="font-bold text-4xl sm:text-5xl text-gray-900 font-serif tracking-tight mb-3">Shop by Category</h1>
            <p className="text-xl text-gray-500 font-light">Find exactly what you're looking for</p>
          </div>
          <button className="group flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-6 py-3 rounded-full">
            <Link href="/categories"> View all categories</Link> 
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Category 1 */}
          <Link href="/category/ceramics" className="block relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer aspect-[4/5]">
            <img src="ceramic.webp" alt="Ceramics" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h2 className="text-white text-2xl font-bold font-serif tracking-wide mb-1">Ceramics</h2>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">Explore collection &rarr;</p>
            </div>
          </Link>

          {/* Category 2 */}
          <Link href="/category/home-decors" className="block relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer aspect-[4/5]">
            <img src="painting.webp" alt="Paintings" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h2 className="text-white text-2xl font-bold font-serif tracking-wide mb-1">Home Decor</h2>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">Explore collection &rarr;</p>
            </div>
          </Link>

          {/* Category 3 */}
          <Link href="/category/leather-goods" className="block relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer aspect-[4/5]">
            <img src="leather.jpg" alt="leather" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h2 className="text-white text-2xl font-bold font-serif tracking-wide mb-1">Leather Goods</h2>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">Explore collection &rarr;</p>
            </div>
          </Link>

          {/* Category 4 */}
          <Link href="/category/handicraft" className="block relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer aspect-[4/5]">
            <img src="dalo.jpg" alt="Handicraft" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h2 className="text-white text-2xl font-bold font-serif tracking-wide mb-1">Handicrafts</h2>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">Explore collection &rarr;</p>
            </div>
          </Link>

        </div>
      </div>
      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32 mt-16">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 font-serif tracking-tight mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            A Curated Collection of Nepal’s Finest Creations. Handpicked for quality, authenticity, and cultural beauty.
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => {
              const cartItem = cart.find((item: any) => item.id === product.id);
              const remainingStock = (product.stock || 0) - (cartItem ? cartItem.quantity : 0);
              return (
                <div key={product.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer">
                  <img src={product.img} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  
                  {idx === 0 && <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full shadow-sm text-gray-900">Bestseller</div>}
                  {idx === 1 && <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full shadow-sm text-white">New</div>}
                  {idx === 2 && <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full shadow-sm text-gray-900">Trending</div>}

                  <button 
                    onClick={(e) => { e.preventDefault(); remainingStock > 0 && handleAddToCart(product); }} 
                    disabled={remainingStock <= 0}
                    className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 z-10 ${remainingStock <= 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-100 translate-y-0' : 'bg-white text-gray-900 opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 hover:bg-red-500 hover:text-white'}`}
                  >
                    {remainingStock <= 0 ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    )}
                  </button>

                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1 cursor-pointer hover:text-red-500 transition-colors">
                    {product.name}
                  </h3>
                  {product.maker && (
                    <>
                      <Link href={`/artisan/${product.maker.slug}`} className="text-sm text-gray-500 mb-1 font-light block hover:underline hover:text-red-500">
                        By {product.maker.name}
                      </Link>
                      <p className="text-sm text-gray-500 mb-4 font-light flex-1">
                        {product.maker.location}, {product.maker.province}
                      </p>
                    </>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-gray-900">Rs. {Number(product.price || 0).toLocaleString()}</span>
                      <span className={`text-[10px] font-medium ${remainingStock <= 0 ? 'text-red-500' : 'text-gray-400'}`}>
                        {remainingStock <= 0 ? "Out of Stock" : `Stock: ${remainingStock}`}
                      </span>
                    </div>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
        )}
      </div>


      {/* Provinces Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32 mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif tracking-tight mb-4 flex items-center justify-center gap-3">
            Discover by Region
            
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
            Bringing authentic, handcrafted products directly from the heart of Nepal's 7 majestic provinces.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { name: "Koshi Province", slug: "koshi", color: "from-blue-500 to-cyan-400", img:'illam.jpg', desc: "Tea gardens & highest peaks" },
            { name: "Madhesh Province", slug: "madhesh", color: "from-amber-500 to-orange-400", img:"madhesh.jpg", desc: "The granary of Nepal" },
            { name: "Bagmati Province", slug: "bagmati", color: "from-emerald-500 to-teal-400",img:"ktm.jpg", desc: "Rich culture & capital city" },
            { name: "Gandaki Province", slug: "gandaki", color: "from-purple-500 to-indigo-400", img:"pokhara.jpg", desc: "Lakes & breathtaking valleys" },
            { name: "Lumbini Province", slug: "lumbini", color: "from-rose-500 to-pink-400", img:"lumbini.webp", desc: "Birthplace of Lord Buddha" },
            { name: "Karnali Province", slug: "karnali", color: "from-sky-500 to-blue-600",img:"karnalii.webp", desc: "Wild nature & deep history" },
            { name: "Sudurpashchim", slug: "sudurpashchim", color: "from-fuchsia-500 to-purple-600", img:"sudur.jpg", desc: "Untouched beauty & wildlife" },
          ].map((province, index) => (
            <Link
              key={province.slug}
              href={`/province/${province.slug}`}
              className="group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-[0_15px_40px_rgb(0,0,0,0.2)] transition-all duration-500 flex flex-col justify-end p-6 h-[18rem] hover:-translate-y-1"
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <img src={province.img} alt={province.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Dark/Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              {/* Subtle color tint based on province.color */}
              <div className={`absolute inset-0 bg-gradient-to-br ${province.color} opacity-20 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500`}></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <span className={`w-10 h-10 rounded-full bg-gradient-to-br ${province.color} flex items-center justify-center text-sm font-bold text-white shadow-md transform group-hover:scale-110 transition-transform duration-500`}>
                    {index + 1}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight mb-2 drop-shadow-md">
                    {province.name}
                  </h3>
                  <p className="text-sm text-gray-200 font-light opacity-80 group-hover:opacity-100 transition-opacity text-shadow-sm">
                    {province.desc}
                  </p>
                </div>
              </div>

              {/* Hover Decorator line */}
              <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${province.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
