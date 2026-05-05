"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, removeItemFully, addToCart, cartCount } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [loading, setLoading] = useState(true);

  // 🔥 Skeleton loader simulation
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto px-5 py-12 flex-1 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          🛒 Your Cart
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart
        </p>

        {/* 🔥 LOADING SKELETON */}
        {loading ? (
          <div className="flex flex-col gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-5 animate-pulse"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>

                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                  <div className="h-3 bg-gray-200 w-1/3 rounded"></div>
                </div>

                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-6 h-4 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>

                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}

            {/* Order Summary Skeleton */}
            <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
              <div className="h-5 bg-gray-200 w-1/3 mb-4 rounded"></div>
              <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
              <div className="h-6 bg-gray-200 w-full mt-4 rounded"></div>
            </div>
          </div>
        ) : cart.length === 0 ? (
          // 🛍️ EMPTY CART
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="text-7xl">🛍️</span>
            <h2 className="text-2xl font-bold text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-gray-400">
              Add some beautiful Nepali products!
            </p>
            <Link
              href="/artisan"
              className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:scale-105 transition"
            >
              Browse Artisans
            </Link>
          </div>
        ) : (
          // 🛒 CART ITEMS
          <div className="flex flex-col gap-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-5 hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-orange-500 font-bold text-sm mt-0.5">
                    NPR {item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 font-bold text-lg flex items-center justify-center transition"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-semibold text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-green-100 hover:text-green-600 font-bold text-lg flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="font-bold text-gray-800">
                    NPR {(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItemFully(item.id)}
                  className="ml-2 text-gray-300 hover:text-red-500 transition text-xl"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Order Summary */}
            <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-500 text-sm mb-2">
                <span>Subtotal ({cartCount} items)</span>
                <span>NPR {total.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-gray-500 text-sm mb-2">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>

              <div className="border-t border-gray-100 my-4" />

              <div className="flex justify-between font-bold text-gray-800 text-lg">
                <span>Total</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                  NPR {total.toLocaleString("en-IN")}
                </span>
              </div>

              <Link href="/checkout">
                <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg hover:scale-[1.02] transition shadow-md">
                  Proceed to Checkout →
                </button>
              </Link>

              <Link
                href="/artisan"
                className="block text-center mt-3 text-sm text-gray-400 hover:text-red-500 transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}