"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ArtisanDashboard() {
  const [username, setUsername] = useState("");
  const [artisanId, setArtisanId] = useState("");
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: ""
  });

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    const storedArtisanId = localStorage.getItem("artisanId");

    if (!token || role !== "artisan") {
      router.push("/sell");
    } else {
      setUsername(storedUsername || "Artisan");
      setArtisanId(storedArtisanId);
      console.log("Artisan Logged In with ID:", storedArtisanId);
      if (storedArtisanId) {
        fetchProducts(storedArtisanId);
        fetchOrders(storedArtisanId);
      }
    }
  }, [router]);

  const fetchProducts = async (id) => {
    try {
      const res = await fetch(`/api/product/artisan/${id}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (id) => {
    try {
      const res = await fetch(`/api/artisan/orders/${id}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/sell");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB ❌");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (!data.success) {
        alert("Upload failed ❌");
        return;
      }
      setForm((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      alert("Upload error ❌");
    } finally {
      setUploading(false);
    }
  };

  const openAddModal = () => {
    setForm({ name: "", description: "", price: "", category: "", stock: "", image: "" });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category || "",
      stock: product.stock,
      image: product.image
    });
    setEditingId(product._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image && !editingId) {
      alert("Please upload a product image!");
      return;
    }

    try {
      if (editingId) {
        // Edit existing product
        const res = await fetch(`/api/product/update/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        const data = await res.json();
        if (data.success) {
          alert("Update requested! Waiting for admin approval.");
          setIsModalOpen(false);
          fetchProducts(artisanId);
        } else {
          alert("Failed to update product");
        }
      } else {
        // Add new product
        const res = await fetch(`/api/product/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, artisanId })
        });
        const data = await res.json();
        if (data.success) {
          alert("Product submitted for approval!");
          setIsModalOpen(false);
          fetchProducts(artisanId);
        } else {
          alert("Failed to add product: " + data.message);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!confirm(`Are you sure you want to mark this order as ${newStatus}?`)) return;

    try {
      const res = await fetch(`/api/order/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Order marked as ${newStatus}!`);
        fetchOrders(artisanId);
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Artisan Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Welcome back, {username}!</p>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button
              onClick={openAddModal}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-bold shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2"
            >
              <span>+</span> New Product
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-300 font-bold rounded-full transition-all flex items-center gap-2"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-4 font-bold transition-all relative ${activeTab === "products" ? "text-purple-400" : "text-gray-400 hover:text-white"}`}
          >
            My Products
            {activeTab === "products" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />}
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-4 font-bold transition-all relative ${activeTab === "orders" ? "text-purple-400" : "text-gray-400 hover:text-white"}`}
          >
            Customer Orders
            {orders.length > 0 && <span className="ml-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">New</span>}
            {activeTab === "orders" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />}
          </button>
        </div>

        {activeTab === "products" ? (
          <>
            <h2 className="text-2xl font-bold mb-6 sr-only">My Products</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-xl text-gray-400">You haven't added any products yet.</p>
            <button onClick={openAddModal} className="mt-4 text-purple-400 font-bold hover:underline">
              Add your first product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group">
                <div className="relative h-48 w-full">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    {product.status === "pending" && (
                      <span className="bg-yellow-500/80 text-yellow-100 text-xs px-2 py-1 rounded-full font-bold shadow">Pending Approval</span>
                    )}
                    {product.status === "approved" && product.pendingUpdate && (
                      <span className="bg-blue-500/80 text-blue-100 text-xs px-2 py-1 rounded-full font-bold shadow">Update Pending</span>
                    )}
                    {product.status === "approved" && !product.pendingUpdate && (
                      <span className="bg-green-500/80 text-green-100 text-xs px-2 py-1 rounded-full font-bold shadow">Active</span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1 truncate">{product.name}</h3>
                  <p className="text-purple-300 font-bold mb-2">Rs. {product.price}</p>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-gray-400">Stock: {product.stock}</span>
                  </div>
                  <button
                    onClick={() => openEditModal(product)}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-medium transition-all"
                  >
                    Edit Product
                  </button>
                </div>
              </div>
            ))}
          </div>
            )}
          </>
        ) : (
          /* Orders Section */
          <div className="space-y-6">
            {ordersLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                <span className="text-5xl block mb-4">📦</span>
                <p className="text-xl text-gray-400">No orders received yet.</p>
                <p className="text-sm text-gray-500 mt-2">When customers buy your products, they will appear here.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-purple-600/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30">
                            {order.orderId}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                            order.status === 'delivered' ? 'bg-green-500/20 text-green-400' : 
                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Customer</p>
                            <p className="font-bold">{order.customerName}</p>
                            <p className="text-sm text-gray-400">{order.customerEmail}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Shipping To</p>
                            <p className="text-sm">{order.location}, {order.province}</p>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-64 bg-black/30 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Your Earnings</p>
                        <p className="text-2xl font-black text-purple-400">Rs. {order.artisanTotal}</p>
                        <p className="text-[10px] text-gray-500 mt-1">From {order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1 w-full">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Items Ordered</p>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg">
                              <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1">
                                <p className="font-bold text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity} × Rs. {item.price}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-purple-300">Rs. {item.quantity * item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {order.status !== 'delivered' && (
                        <div className="md:ml-6">
                          <button
                            onClick={() => handleUpdateStatus(order._id, 'delivered')}
                            className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
                          >
                            <span>✅</span> Mark as Delivered
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-gray-900/95 backdrop-blur-sm">
              <h2 className="text-2xl font-bold">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-2xl">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Price (Rs)</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({...form, price: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Category</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({...form, category: e.target.value})}
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 mb-6"
                >
                  <option value="" disabled>Select a Category</option>
                  <option value="handicraft">Handicraft</option>
                  <option value="textiles-garments">Textiles & Garments</option>
                  <option value="ceramics">Ceramics</option>
                  <option value="home-decors">Home Decors</option>
                  <option value="agricultural-products">Agricultural Products</option>
                  <option value="leather-goods">Leather Goods</option>
                  <option value="herbal-wellness">Herbal & Wellness</option>
                  <option value="clothing">Clothing</option>
                  <option value="dairy-sweets">Dairy & Sweets</option>
                  <option value="paper-eco-friendly">Paper and Eco Friendly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Description</label>
                <textarea
                  required
                  rows="4"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 resize-none"
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Stock Available</label>
                  <input
                    type="number"
                    required
                    value={form.stock}
                    onChange={(e) => setForm({...form, stock: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-500"
                  />
                  {uploading && <p className="text-sm text-yellow-400 mt-2">Uploading image...</p>}
                </div>
              </div>

              {form.image && (
                <div className="mt-4">
                  <p className="text-sm font-bold text-gray-300 mb-2">Image Preview</p>
                  <img src={form.image} alt="Preview" className="h-32 rounded-xl object-cover border border-white/20" />
                </div>
              )}

              <div className="pt-4 flex justify-end gap-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold shadow-lg shadow-purple-500/30 transition-all disabled:opacity-50"
                >
                  {editingId ? "Request Update" : "Submit for Approval"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
