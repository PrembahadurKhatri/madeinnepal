//api/artisan/page.jsx
"use client";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const page = () => {
  const staticMakers = [];
  const [loading,setLoading]=useState(true);
  const [makers, setMakers] = useState(staticMakers);

  useEffect(() => {
    fetch("/api/public/data") 
      .then(res => res.json())
      .then(data => {
        if(data.success) {
           setMakers([...staticMakers, ...data.dbMakers]);
        }
      })
      .catch(() => setMakers(staticMakers))
      .finally(() => setLoading(false));
  }, []);

   
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 md:p-14">

        {/* 🔥 HERO HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            🇳🇵 Meet Nepali Creators
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover passionate individuals, local brands and producers 
            crafting authentic Nepali products across all 7 provinces.
          </p>
        </div>

   {/* GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

  {loading
    ? Array.from({ length: makers.length }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
        >
          {/* image skeleton */}
          <div className="h-48 bg-gray-200"></div>

          {/* content skeleton */}
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
            <div className="h-3 bg-gray-200 w-1/3 rounded"></div>
            <div className="h-3 bg-gray-200 w-full rounded"></div>
            <div className="h-3 bg-gray-200 w-5/6 rounded"></div>

            <div className="h-10 bg-gray-200 rounded-xl mt-4"></div>
          </div>
        </div>
      ))
    : makers.map((maker) => (
        <div
          key={maker.id}
          className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-3 border border-gray-100"
        >
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100 blur-xl"></div>

          {/* Badge */}
          <span className="absolute top-3 left-3 z-10 text-xs bg-black/70 text-white px-3 py-1 rounded-full backdrop-blur">
            Vendor
          </span>

          {/* Image */}
          <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative z-10">
            <img
              src={maker.img}
              alt={maker.name}
              className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-5 relative z-10">
            <h2 className="text-lg font-bold group-hover:text-red-500 transition">
              {maker.name}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              📍 {maker.location} • {maker.province}
            </p>

            <p className="text-sm text-gray-600 mt-3 line-clamp-3 leading-relaxed">
              {maker.desc}
            </p>

            <Link href={`/artisan/${maker.slug}`}>
              <button className="mt-5 w-full py-2 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-semibold tracking-wide shadow hover:scale-105 hover:shadow-lg transition">
                Explore →
              </button>
            </Link>
          </div>
        </div>
      ))}
</div>
      </div>

      <Footer />
    </div>
  );
};

export default page;