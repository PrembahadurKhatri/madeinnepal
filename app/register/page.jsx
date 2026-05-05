"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({ artisan: false, product: false });

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    location: "",
    province: "",
    description: "",
    productName: "",
    productDescription: "",
    category: "",
    stock: "",
    price: "",
    artisanImage: "",
    productImage: ""
  });



const handleImageUpload = async (e, type) => {
  const file = e.target.files[0];
  if (!file) return;

  // size check
  if (file.size > 2 * 1024 * 1024) {
    alert("Image must be less than 2MB ❌");
    return;
  }

  setUploading(prev => ({ ...prev, [type]: true }));

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!data.success) {
      alert("Upload failed ❌: " + (data.message || ""));
      return;
    }

    setForm(prev => ({
      ...prev,
      [`${type}Image`]: data.url
    }));

  } catch (err) {
    console.error(err);
    alert("Upload error ❌");
  } finally {
    setUploading(prev => ({ ...prev, [type]: false }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ prevent double click
  if (loading) return;

  // ✅ safety check
  if (!form.artisanImage || !form.productImage) {
    alert("Please upload both images ❌");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/artisan/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!data.success) {
      alert("Submission failed ❌: " + (data.message || ""));
    } else {
      alert("Submitted for approval ✅");

      // ✅ reset form
      setForm({
        username: "",
        password: "",
        name: "",
        email: "",
        location: "",
        province: "",
        description: "",
        productName: "",
        productDescription: "",
        category: "",
        stock: "",
        price: "",
        artisanImage: "",
        productImage: ""
      });
    }

  } catch (err) {
    alert("Server error ❌");
  } finally {
    setLoading(false);
  }
};

  const provinces = ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"];

  return (
    <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 min-h-screen relative overflow-hidden">
      {/* Floating Nepal elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      <Navbar />

      {/* HERO */}
      <div className="text-center py-20 px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent leading-tight mb-6">
            Join MadeinNepal 🇳🇵
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Showcase your authentic Nepali crafts to the world. Get approved and start selling today.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="flex justify-center px-4 pb-20 relative z-10">
        <div className="w-full max-w-2xl">
          <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/30">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
              <span>Artisan & Product Details</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Artisan Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🧑‍🎨</span>
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Artisan Profile</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-red-500 mb-2">Username</label>
                    <input
                      className="input-enhanced px-2 bg-white"
                      placeholder="Choose a username"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-red-500 mb-2">Password</label>
                    <input
                      className="input-enhanced px-2 bg-white"
                      type="password"
                      placeholder="Create a password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      className="input-enhanced px-2 bg-white"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      className="input-enhanced px-2 bg-white"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City / Location</label>
                    <input
                      className="input-enhanced px-2 bg-white"
                      placeholder="e.g. Pokhara"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Province</label>
                    <select
                      className="input-enhanced px-2 bg-white"
                      value={form.province}
                      onChange={(e) => setForm({ ...form, province: e.target.value })}
                      required
                    >
                      <option value="">Select your province</option>
                      {provinces.map((province) => (
                        <option key={province}>{province}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Artisan Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    Profile Photo
                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Recommended</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "artisan")}
                      className="input-enhanced px-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-orange-500 file:to-red-500 file:text-white hover:file:from-orange-600 hover:file:to-red-600 cursor-pointer"
                      disabled={uploading.artisan}
                    />
                    {uploading.artisan && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
                        <div className="w-5 h-5 border-2 border-orange-400 border-t-orange-600 rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  {form.artisanImage && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={form.artisanImage} alt="Artisan" className="w-12 h-12 rounded-xl object-cover border-2 border-orange-200" />
                      <span className="text-xs text-green-600 font-medium">✅ Uploaded</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">About You & Your Craft</label>
                  <textarea
                    className="input-enhanced h-32 w-full px-2 bg-white resize-none"
                    placeholder="Tell us about your background, experience, and what makes your craft special..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Product Section */}
              <div className="space-y-6 pt-8 border-t border-orange-100">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">📦</span>
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Featured Product</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                    <input
                      className="input-enhanced px-2 bg-white"
                      placeholder="e.g. Handwoven Khukuri Sheath"
                      value={form.productName}
                      onChange={(e) => setForm({ ...form, productName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price (NPR)</label>
                    <input
                      className="input-enhanced px-2 bg-white"
                      type="number"
                      placeholder="e.g. 2500"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Product Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    Product Photo
                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Required</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "product")}
                      className="input-enhanced px-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-orange-500 file:to-red-500 file:text-white hover:file:from-orange-600 hover:file:to-red-600 cursor-pointer"
                      disabled={uploading.product}
                    />
                    {uploading.product && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
                        <div className="w-5 h-5 border-2 border-orange-400 border-t-orange-600 rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  {form.productImage && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={form.productImage} alt="Product" className="w-16 h-16 rounded-xl object-cover border-2 border-green-200 shadow-md" />
                      <span className="text-xs text-green-600 font-medium">✅ Product photo ready</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Description</label>
                  <textarea
                    className="input-enhanced h-32 w-full px-2 bg-white resize-none"
                    placeholder="Describe your product, materials used, dimensions, and what makes it unique..."
                    value={form.productDescription}
                    onChange={(e) => setForm({ ...form, productDescription: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      className="input-enhanced px-2 bg-white"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      required
                    >
                      <option value="" disabled>Select a Category</option>
                      <option value="handicraft">Handicraft</option>
                      <option value="textiles-garments">Textiles & Garments</option>
                      <option value="ceramics">Ceramics</option>
                      <option value="home-decors">Home Decors</option>
                      <option value="agricultural-products">Agricultural Products</option>
                      <option value="leather-goods">Leather Goods</option>
                      <option value="herbal-wellness">Herbal & Wellness</option>
                      <option value="dairy-sweets">Dairy & Sweets</option>
                      <option value="paper-eco-friendly">Paper and Eco Friendly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Available</label>
                    <input
                      className="input-enhanced px-2 bg-white"
                      type="number"
                      placeholder="e.g. 25"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={uploading.artisan || uploading.product || loading}
                className="w-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Submit for Approval 🚀
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8 pt-6 border-t border-gray-100">
              Applications reviewed within 48 hours by our team.
            </p>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .input-enhanced {
          @apply w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-200/50 focus:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-md;
        }
        .input-enhanced:focus {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}