"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    setError("");
    setOrder(null);
    setLoading(true);

    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, email }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Invalid response:", text);
        return setError("Server configuration error (API returned HTML instead of JSON)");
      }

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-xl mx-auto py-16 px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-8 text-center border">

          {/* Title */}
          <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400 font-serif font-extrabold mb-2">
            Track Your Order
          </h1>

          <p className="text-gray-500 mb-6 text-sm">
            Enter your Order ID and Email to see status
          </p>

          {/* Inputs */}
          <input
            type="text"
            placeholder="🔢 Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="📧 Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Button */}
          <button
            onClick={handleTrack}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Tracking..." : "🚀 Track Order"}
          </button>

          {/* Error */}
          {error && (
            <p className="text-red-500 mt-4 bg-red-100 p-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Result Card */}
          {order && (
            <div className="mt-8 bg-gray-50 p-5 rounded-2xl shadow-inner text-left">

              {/* Order ID */}
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold">Order ID:</p>
                <span className="text-sm text-gray-500">{order._id}</span>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold">Status:</p>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold">Total:</p>
                <span className="text-lg font-bold text-blue-600">
                  Rs. {order.total}
                </span>
              </div>

              {/* Items */}
              <div className="mt-4">
                <p className="font-semibold mb-2">🛒 Items:</p>

                <div className="space-y-2">
                  {order.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between bg-white p-2 rounded-lg shadow-sm"
                    >
                      <span>{item.name}</span>
                      <span className="text-gray-500">
                        x {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}