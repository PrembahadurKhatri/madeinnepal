"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

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

export default function CategoriesPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-500">
          Explore Categories
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Discover authentic Nepali products 🇳🇵
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 pb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            {/* ✅ FIXED ROUTE HERE */}
            <div className="group relative cursor-pointer rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

              {index < 3 && (
                <span className="absolute top-3 left-3 z-10 text-xs bg-red-500 text-white px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <img
                src={category.img}
                alt={category.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              <div className="absolute bottom-5 left-4 right-4">
                <h2 className="text-white font-semibold text-lg">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition">
                  Explore →
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}