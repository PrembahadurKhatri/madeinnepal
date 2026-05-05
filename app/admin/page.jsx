"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [artisans, setArtisans] = useState([]);
  const [products, setProducts] = useState([]);
  const [allArtisans, setAllArtisans] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchPending = async () => {
    const res = await fetch("/api/admin/pending");
    const data = await res.json();
    setArtisans(data.artisans || []);
    setProducts(data.products || []);
  };

  const fetchAllArtisans = async () => {
    const res = await fetch("/api/admin/all-artisans");
    const data = await res.json();
    setAllArtisans(data.artisans || []);
  };

  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data.orders || []);
  };

  useEffect(() => {
    fetchPending();
    fetchAllArtisans();
    fetchOrders();
  }, []);

  const handleApprove = async (id) => {
    await fetch(`/api/admin/approve/${id}`, { method: "POST" });
    fetchPending();
  };

  const handleReject = async (id) => {
    await fetch(`/api/admin/reject/${id}`, { method: "POST" });
    fetchPending();
  };

  const handleProductApprove = async (id) => {
    await fetch(`/api/product/approve/${id}`, { method: "PUT" });
    fetchPending();
  };

  const handleProductReject = async (id) => {
    await fetch(`/api/product/reject/${id}`, { method: "PUT" });
    fetchPending();
  };

  const handleToggleArtisan = async (id) => {
    await fetch(`/api/admin/toggle-artisan/${id}`, { method: "PUT" });
    fetchAllArtisans();
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono">
      {/* Glitchy header with glow */}
      <div className="bg-gradient-to-r from-blue-950 via-purple-950 to-black border border-green-500/40 p-6 border-l-0 border-r-0 border-t-0 shadow-lg shadow-green-500/10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 leading-tight">
          Admin Pannel : Welcome Saahill Khatri ...
        </h1>
        <p className="text-sm text-green-300 mt-1">
          pending artisan firewalls: {artisans.length} | pending product updates: {products.length}
        </p>
        <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></span>
          Connection: <span className="text-green-300 font-bold">SECURE</span>
        </div>
      </div>

      {/* Terminal‑like body */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {artisans.length === 0 && products.length === 0 && allArtisans.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <span className="text-6xl mb-4 block">⧉</span>
            <p className="text-2xl font-bold text-green-400">SYSTEM CLEAN</p>
            <p className="text-sm mt-2 font-mono text-green-300">
              no pending intrusions detected
            </p>
          </div>
        ) : (
          <>
            {artisans.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2">PENDING ARTISANS</h2>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {artisans.map((a) => (
                    <div
                      key={a._id}
                      className="bg-gray-950 border border-green-500/30 rounded-lg shadow-lg shadow-green-500/10 p-6 backdrop-blur-sm hover:border-green-400/60 hover:shadow-green-500/20 transition-all duration-200"
                    >
                      {/* Top status bar */}
                      <div className="flex items-center justify-between mb-4 text-xs font-mono">
                        <span className="text-green-400 uppercase">
                          pending access request
                        </span>
                        <span className="text-gray-500 px-2 py-0.5 bg-green-900/30 rounded">
                          id: {a._id.slice(-6)}
                        </span>
                      </div>

                      {/* Image + info */}
                      <div className="flex gap-4 mb-4">
                        <div className="flex-shrink-0">
                          <img
                            src={a.image || "/placeholder-artisan.jpg"}
                            alt={a.name}
                            className="w-16 h-16 rounded-lg border border-green-500/30 shadow-sm"
                          />
                        </div>

                        <div className="flex-grow">
                          <h2 className="text-lg font-bold text-green-300">
                            {a.name}
                          </h2>
                          <p className="text-sm text-gray-400">{a.email}</p>
                          <p className="text-xs text-gray-500">
                            {a.location}, {a.province}
                          </p>
                        </div>
                      </div>

                      {/* Product preview (if any) */}
                      {a.product && (
                        <div className="mt-5 border-t border-gray-700 pt-4 space-y-3">
                          <p className="text-xs text-yellow-400 font-mono uppercase">
                            product preview:
                          </p>

                          <div className="flex gap-3 items-center">
                            <img
                              src={a.product.image}
                              alt={a.product.name}
                              className="w-14 h-14 rounded border border-yellow-500/30 shadow-sm"
                            />

                            <div>
                              <p className="text-sm text-yellow-300 font-bold">
                                {a.product.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                Rs. {a.product.price} | Category: {a.product.category}
                              </p>
                              <p className="text-xs text-gray-400 mb-1">
                                Stock: {a.product.stock}
                              </p>
                              <p className="text-sm text-gray-300 line-clamp-2">
                                {a.product.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bio as terminal log */}
                      <p className="text-sm text-gray-300 font-mono leading-relaxed mt-4 border-t border-gray-800 pt-4">
                        {a.description}
                      </p>

                      {/* Action buttons (hacker style) */}
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleApprove(a._id)}
                          className="flex-1 bg-transparent border border-green-500 hover:bg-green-900/50 hover:border-green-400 text-green-300 font-mono uppercase text-sm px-4 py-2.5 rounded transition-all duration-150 shadow-sm hover:shadow-green-400/10"
                        >
                          execute access grant
                        </button>

                        <button
                          onClick={() => handleReject(a._id)}
                          className="flex-1 bg-transparent border border-red-500 hover:bg-red-900/50 hover:border-red-400 text-red-300 font-mono uppercase text-sm px-4 py-2.5 rounded transition-all duration-150 shadow-sm hover:shadow-red-400/10"
                        >
                          terminate connection
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {products.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4 border-b border-yellow-500/30 pb-2">PENDING PRODUCTS / UPDATES</h2>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {products.map((p) => {
                    const isUpdate = !!p.pendingUpdate;
                    
                    return (
                      <div
                        key={p._id}
                        className="bg-gray-950 border border-yellow-500/30 rounded-lg shadow-lg shadow-yellow-500/10 p-6 backdrop-blur-sm hover:border-yellow-400/60 hover:shadow-yellow-500/20 transition-all duration-200 flex flex-col"
                      >
                        <div className="flex items-center justify-between mb-4 text-xs font-mono">
                          <span className="text-yellow-400 uppercase font-bold">
                            {isUpdate ? "pending modification" : "pending new product"}
                          </span>
                          <span className="text-gray-500 px-2 py-0.5 bg-yellow-900/30 rounded">
                            id: {p._id.slice(-6)}
                          </span>
                        </div>

                        {isUpdate ? (
                          <div className="mb-4 text-sm font-mono border border-yellow-500/20 p-3 rounded bg-yellow-900/10 flex-grow">
                            <h3 className="text-yellow-300 font-bold mb-2 uppercase border-b border-yellow-500/20 pb-1 flex items-center justify-between">
                              Modification Details
                              {p.pendingUpdate.image !== p.image && <span className="text-[10px] bg-yellow-500/20 px-1.5 py-0.5 rounded text-yellow-400">Image Updated</span>}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-gray-500 mb-1 underline decoration-gray-700 underline-offset-2">CURRENT STATE</p>
                                <p className="text-gray-400 truncate">Name: {p.name}</p>
                                <p className="text-gray-400">Price: Rs. {p.price}</p>
                                <p className="text-gray-400">Category: {p.category}</p>
                                <p className="text-gray-400">Stock: {p.stock}</p>
                                <p className="text-gray-400 line-clamp-2 mt-1 border-t border-gray-800 pt-1">Desc: {p.description}</p>
                              </div>
                              <div>
                                <p className="text-yellow-500 mb-1 underline decoration-yellow-900 underline-offset-2">REQUESTED UPDATE</p>
                                <p className={p.name !== p.pendingUpdate.name ? "text-yellow-300 bg-yellow-900/40 px-1 truncate rounded" : "text-gray-400 truncate"}>Name: {p.pendingUpdate.name}</p>
                                <p className={p.price != p.pendingUpdate.price ? "text-yellow-300 bg-yellow-900/40 px-1 rounded" : "text-gray-400"}>Price: Rs. {p.pendingUpdate.price}</p>
                                <p className={p.category !== p.pendingUpdate.category ? "text-yellow-300 bg-yellow-900/40 px-1 rounded" : "text-gray-400"}>Category: {p.pendingUpdate.category}</p>
                                <p className={p.stock != p.pendingUpdate.stock ? "text-yellow-300 bg-yellow-900/40 px-1 rounded" : "text-gray-400"}>Stock: {p.pendingUpdate.stock}</p>
                                <p className={p.description !== p.pendingUpdate.description ? "text-yellow-300 bg-yellow-900/40 px-1 line-clamp-2 mt-1 rounded border-t border-yellow-900/50 pt-1" : "text-gray-400 line-clamp-2 mt-1 border-t border-gray-800 pt-1"}>Desc: {p.pendingUpdate.description}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4 flex-grow">
                            <div className="flex gap-4 mb-4">
                              <div className="flex-shrink-0">
                                <img
                                  src={p.image || "/placeholder-product.jpg"}
                                  alt={p.name}
                                  className="w-16 h-16 rounded-lg border border-yellow-500/30 shadow-sm object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h2 className="text-lg font-bold text-yellow-300">{p.name}</h2>
                                <p className="text-sm text-yellow-200/80">Rs. {p.price}</p>
                                <p className="text-xs text-gray-400">Category: {p.category}</p>
                                <p className="text-xs text-gray-400">Stock: {p.stock}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-300 font-mono leading-relaxed mt-4 border-t border-gray-800 pt-4">
                              {p.description}
                            </p>
                          </div>
                        )}

                      {p.artisan && (
                        <div className="mt-4 pt-4 border-t border-gray-800">
                          <p className="text-xs text-green-400 font-mono uppercase mb-2">Author Info:</p>
                          <div className="flex gap-2 items-center">
                            <img src={p.artisan.image || "/placeholder-artisan.jpg"} alt={p.artisan.name} className="w-8 h-8 rounded-full border border-green-500/30" />
                            <div>
                              <p className="text-sm text-green-300">{p.artisan.name}</p>
                              <p className="text-xs text-gray-500">{p.artisan.email}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleProductApprove(p._id)}
                          className="flex-1 bg-transparent border border-yellow-500 hover:bg-yellow-900/50 hover:border-yellow-400 text-yellow-300 font-mono uppercase text-sm px-4 py-2.5 rounded transition-all duration-150 shadow-sm hover:shadow-yellow-400/10"
                        >
                          approve update
                        </button>

                        <button
                          onClick={() => handleProductReject(p._id)}
                          className="flex-1 bg-transparent border border-red-500 hover:bg-red-900/50 hover:border-red-400 text-red-300 font-mono uppercase text-sm px-4 py-2.5 rounded transition-all duration-150 shadow-sm hover:shadow-red-400/10"
                        >
                          reject update
                        </button>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            )}

            {allArtisans.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-400 mb-4 border-b border-blue-500/30 pb-2 mt-8">REGISTERED ARTISANS DATABASE</h2>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {allArtisans.map((a) => (
                    <div
                      key={a._id}
                      className={`bg-gray-950 border ${a.status === 'deactivated' ? 'border-red-500/30 shadow-red-500/10' : 'border-blue-500/30 shadow-blue-500/10'} rounded-lg shadow-lg p-6 backdrop-blur-sm transition-all duration-200`}
                    >
                      <div className="flex items-center justify-between mb-4 text-xs font-mono">
                        <span className={a.status === 'deactivated' ? 'text-red-400 uppercase' : 'text-blue-400 uppercase'}>
                          status: {a.status}
                        </span>
                        <span className="text-gray-500 px-2 py-0.5 bg-gray-900/50 rounded">
                          id: {a._id.slice(-6)}
                        </span>
                      </div>

                      <div className="flex gap-4 mb-4">
                        <div className="flex-shrink-0">
                          <img
                            src={a.image || "/placeholder-artisan.jpg"}
                            alt={a.name}
                            className={`w-16 h-16 rounded-lg border ${a.status === 'deactivated' ? 'border-red-500/30 grayscale' : 'border-blue-500/30'} shadow-sm`}
                          />
                        </div>

                        <div className="flex-grow">
                          <h2 className={`text-lg font-bold ${a.status === 'deactivated' ? 'text-red-300' : 'text-blue-300'}`}>
                            {a.name}
                          </h2>
                          <p className="text-sm text-gray-400">{a.email}</p>
                          <p className="text-xs text-gray-500">
                            {a.location}, {a.province}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4 border-t border-gray-800 pt-4">
                        {a.status === "approved" ? (
                          <button
                            onClick={() => handleToggleArtisan(a._id)}
                            className="flex-1 bg-transparent border border-red-500 hover:bg-red-900/50 hover:border-red-400 text-red-300 font-mono uppercase text-sm px-4 py-2.5 rounded transition-all duration-150 shadow-sm hover:shadow-red-400/10"
                          >
                            deactivate account
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleArtisan(a._id)}
                            className="flex-1 bg-transparent border border-green-500 hover:bg-green-900/50 hover:border-green-400 text-green-300 font-mono uppercase text-sm px-4 py-2.5 rounded transition-all duration-150 shadow-sm hover:shadow-green-400/10"
                          >
                            reactivate account
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {orders.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-pink-400 mb-4 border-b border-pink-500/30 pb-2">ORDER LOGS & DELIVERY STATUS</h2>
                <div className="overflow-x-auto bg-gray-950 border border-pink-500/30 rounded-lg shadow-lg shadow-pink-500/10">
                  <table className="w-full text-left text-sm font-mono">
                    <thead className="bg-pink-900/20 text-pink-300 border-b border-pink-500/20">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Items</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {orders.map((o) => (
                        <tr key={o._id} className="hover:bg-pink-900/5 transition-colors">
                          <td className="p-4 text-pink-400 font-bold">{o.orderId}</td>
                          <td className="p-4">
                            <p className="text-gray-200">{o.name}</p>
                            <p className="text-xs text-gray-500">{o.location}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex -space-x-2">
                              {o.items.map((item, i) => (
                                <img 
                                  key={i} 
                                  src={item.img} 
                                  alt={item.name} 
                                  className="w-8 h-8 rounded-full border border-gray-900 object-cover" 
                                  title={item.name}
                                />
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-gray-200">Rs. {o.total}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                              o.status === 'delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              o.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                              {o.status}
                            </span>
                            {o.status === 'delivered' && (
                              <p className="text-[10px] text-green-500 mt-1 animate-pulse">✓ VERIFIED DELIVERY</p>
                            )}
                          </td>
                          <td className="p-4 text-gray-500">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom terminal line */}
      <div className="bg-gray-900 border-t border-gray-700 px-6 py-3 text-xs text-gray-500 flex flex-wrap justify-between items-center gap-2">
        <span>admin panel v1.0.4</span>
        <span className="text-green-400 font-mono">shell: artisan@system</span>
        <span>status: online</span>
      </div>
    </div>
  );
}