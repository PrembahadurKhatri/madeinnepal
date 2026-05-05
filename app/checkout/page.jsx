"use client";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { clearCart, cart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", email: "", location: "", province: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const provinces = ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"];
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!formData.name || !formData.email || !formData.location || !formData.province) {
      return alert("Please fill in all fields ❌");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, total: totalPrice, items: cart }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create order");
      setOrderId(data.orderId);
      clearCart();
    } catch (err) {
      alert(err.message || "Checkout error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {cart.length === 0 && !orderId ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold">Your cart is empty 🛒</h2>
            <button onClick={() => router.push("/market")} className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">Continue Shopping</button>
          </div>
        ) : orderId ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-200 text-center">
            <h2 className="text-2xl font-bold text-green-700">🎉 Order Placed Successfully!</h2>
            <p className="mt-4">Your Order ID:</p>
            <p className="font-mono text-xl font-bold my-2 bg-gray-100 py-2 rounded">{orderId}</p>
            <button onClick={() => router.push("/trackorder")} className="mt-4 bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800">Track Order</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {/* Form Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
              <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-xl mb-3" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-xl mb-3" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <input type="text" placeholder="City / Location" className="w-full p-3 border rounded-xl mb-3" onChange={(e) => setFormData({...formData, location: e.target.value})} />
              <select className="w-full p-3 border rounded-xl mb-4" onChange={(e) => setFormData({...formData, province: e.target.value})}>
                <option value="">Select Province</option>
                {provinces.map((p) => <option key={p}>{p}</option>)}
              </select>
              <button onClick={handleCheckout} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>

            {/* Summary Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-4">
                  <img src={item.img || "/placeholder.png"} className="w-14 h-14 object-cover rounded-lg" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">NPR {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>NPR {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}