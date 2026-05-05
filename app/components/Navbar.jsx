"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const router = useRouter();
  const [query, setQuery] = useState("");



  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 px-6 py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-gray-800 hover:opacity-80 transition-opacity">
            <img src="/nepal.png" alt="Made in Nepal" className="w-[50px] h-[50px] object-cover rounded-full shadow-sm" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500 font-serif tracking-tight">
              MadeinNepal
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
          <li><Link href="/" className="hover:text-red-500 transition-colors duration-200">Home</Link></li>
          <li><Link href="/market" className="hover:text-red-500 transition-colors duration-200">Marketplace</Link></li>
          <li><Link href="/artisan" className="hover:text-red-500 transition-colors duration-200">Meet the Artisans</Link></li>
        </ul>


        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <Link href="/register" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-red-500 transition-colors duration-200">Sign up</Link>
            <Link href="/sell" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-red-500 transition-colors duration-200">Sell</Link>
          <Link href="/cart" className="flex items-center text-gray-600 hover:text-red-500 transition-colors duration-200 group">
            <div className="relative">
              <svg className="w-6 h-6 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span
                key={cartCount}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full group-hover:bg-orange-500 transition-colors"
              >
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:inline text-sm font-medium ml-1">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
