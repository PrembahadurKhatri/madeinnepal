"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ShippingReturns() {//for shipping 
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [returnForm, setReturnForm] = useState({//for return 
    orderId: "",
    email: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  const handleShipping = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/shipping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shipping),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Invalid response:", text);
      return setMessage("❌ Server error: API returned HTML instead of JSON for shipping.");
    }

    if (data.success) {
      setMessage("🚚 Order placed successfully!");
      setShipping({ name: "", email: "", phone: "", address: "" });
    } else {
      setMessage("❌ Failed to place order");
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/return", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(returnForm),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Invalid response:", text);
      return setMessage("❌ Server error: API returned HTML instead of JSON for return.");
    }

    if (data.success) {
      setMessage("🔄 Return request submitted!");
      setReturnForm({ orderId: "", email: "", reason: "" });
    } else {
      setMessage("❌ Failed to submit return");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-2">
          Shipping & Returns
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Fast delivery & easy return system 🚀
        </p>

        {/* MESSAGE */}
        {message && (
          <div className="mb-6 text-center">
            <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
              {message}
            </span>
          </div>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* SHIPPING CARD */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              🚚 Shipping
            </h2>

            <form onSubmit={handleShipping} className="space-y-3">

              <input
                placeholder="Full Name"
                value={shipping.name}
                onChange={(e) =>
                  setShipping({ ...shipping, name: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                placeholder="Email"
                value={shipping.email}
                onChange={(e) =>
                  setShipping({ ...shipping, email: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                placeholder="Phone"
                value={shipping.phone}
                onChange={(e) =>
                  setShipping({ ...shipping, phone: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                placeholder="Full Address"
                value={shipping.address}
                onChange={(e) =>
                  setShipping({ ...shipping, address: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold transition hover:scale-105">
                Place Order
              </button>
            </form>
          </div>

          {/* RETURN CARD */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-red-400">
              🔄 Return
            </h2>

            <form onSubmit={handleReturn} className="space-y-3">

              <input
                placeholder="Order ID"
                value={returnForm.orderId}
                onChange={(e) =>
                  setReturnForm({ ...returnForm, orderId: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                placeholder="Email"
                value={returnForm.email}
                onChange={(e) =>
                  setReturnForm({ ...returnForm, email: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-red-500"
              />

              <textarea
                placeholder="Reason for return"
                value={returnForm.reason}
                onChange={(e) =>
                  setReturnForm({ ...returnForm, reason: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-red-500"
              />

              <button className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg font-semibold transition hover:scale-105">
                Submit Return
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}