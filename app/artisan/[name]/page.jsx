//api/artisan/[name]/page.jsx
"use client";
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useParams } from "next/navigation";
import { useCart } from "../../context/CartContext";

const page = () => {
    const { name } = useParams();
    const { cart, addToCart } = useCart();
    const [toast, setToast] = useState(null);
    const [expandedProducts, setExpandedProducts] = useState({});

    const toggleDescription = (id) => {
        setExpandedProducts(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleAddToCart = (product) => {
      addToCart(product);
      setToast(product.name);
      setTimeout(() => setToast(null), 2500);
    };

    const staticMakers = [];
    const staticProducts = [];
    const [makers, setMakers] = useState(staticMakers);
    const [products, setProducts] = useState(staticProducts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/public/data")
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    setMakers([...staticMakers, ...data.dbMakers]);
                    setProducts([...staticProducts, ...data.dbProducts]);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    //find creator
    const maker = makers.find((m) => m.slug === name);

    //find products
    const makerProducts = products.filter((p) => p.artisan === name);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center animate-pulse">
                    <span className="text-6xl mb-4 block">⏳</span>
                    <h1 className="text-2xl font-bold text-gray-800">Loading Artisan Data...</h1>
                </div>
            </div>
        );
    }

    if (!maker) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <span className="text-6xl mb-4 block">😕</span>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Artisan Not Found</h1>
                    <p className="text-gray-500">We couldn't locate the artisan you're looking for.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen font-sans selection:bg-orange-500 selection:text-white">
            <Navbar />

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl animate-fade-in-up">
                    <span className="text-xl">🛒</span>
                    <div>
                        <p className="text-xs text-gray-400">Added to cart</p>
                        <p className="font-semibold text-sm">{toast}</p>
                    </div>
                    <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full ml-2" />
                </div>
            )}

            {/* 🔥 HERO / HEADER SECTION */}
            <div className="relative bg-gradient-to-br from-orange-600 via-red-500 to-pink-600 pt-32 pb-48 px-5 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute -top-20 -left-20 w-96 h-96 blur-3xl fill-white">
                        <path d="M42.4,-73.2C54.4,-67.2,63,-53.4,70.5,-39.8C78,-26.2,84.4,-13.1,83.9,-0.3C83.4,12.5,76,25,68,36.7C60,48.4,51.4,59.3,40.1,65.6C28.8,71.9,14.4,73.6,0.5,72.8C-13.4,72,-26.8,68.7,-38.3,62.3C-49.8,55.9,-59.4,46.4,-67.2,35.3C-75,24.2,-81,12.1,-82.1,-0.6C-83.2,-13.3,-79.4,-26.6,-71.4,-37.2C-63.4,-47.8,-51.2,-55.7,-38.7,-61.4C-26.2,-67.1,-13.1,-70.6,1.4,-72.6C15.9,-74.6,30.4,-79.2,42.4,-73.2Z" />
                    </svg>
                    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute top-40 -right-20 w-[30rem] h-[30rem] blur-[80px] fill-yellow-300">
                        <path d="M38.1,-63.9C49.5,-55.5,58.8,-43.8,65.6,-30.6C72.4,-17.4,76.6,-2.7,73.4,10.6C70.2,23.9,59.5,35.8,47.9,45.3C36.3,54.8,23.9,61.9,10.3,65.5C-3.3,69.1,-18.1,69.1,-30.9,63.5C-43.7,57.9,-54.5,46.7,-62.4,33.5C-70.3,20.3,-75.2,5.1,-72.5,-8.8C-69.8,-22.7,-59.5,-35.3,-47.7,-43.6C-35.9,-51.9,-22.5,-55.9,-8.8,-57.8C4.9,-59.7,19.8,-59.6,26.7,-60.1" />
                    </svg>
                </div>

                <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10">
                    {/* Image */}
                    <div className="relative group shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                        <img
                            src={maker.img}
                            alt={maker.name}
                            className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-white shadow-2xl"
                        />
                    </div>

                    {/* Info */}
                    <div className="text-center md:text-left text-white max-w-2xl">
                        <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-5 tracking-wider shadow-xl">
                            🇳🇵 AUTHENTIC NEPALI CREATOR
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg leading-tight">
                            {maker.name}
                        </h1>

                        <div className="flex items-center justify-center md:justify-start gap-3 text-orange-50 mb-6 font-medium text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                            <span>{maker.location}</span>
                            <span className="w-1.5 h-1.5 bg-orange-200 rounded-full"></span>
                            <span>{maker.province} Province</span>
                        </div>

                        <p className="text-lg md:text-xl text-orange-50/90 leading-relaxed font-light mb-8 drop-shadow max-w-xl mx-auto md:mx-0">
                            {maker.desc}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-5 -mt-24 relative z-20 pb-24">
                {/* 🛍️ PRODUCTS SECTION */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                                Masterpieces
                            </h2>
                            <p className="text-gray-500 text-lg">Discover the handcrafted collection by {maker.name}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                            {makerProducts.length} {makerProducts.length === 1 ? 'Product' : 'Products'} Available
                        </div>
                    </div>

                    {makerProducts.length === 0 ? (
                        <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <span className="text-6xl block mb-4">🎨</span>
                            <h3 className="text-2xl font-bold text-gray-700">No products available just yet</h3>
                            <p className="text-gray-500 mt-2 max-w-md mx-auto">This artisan is currently working on crafting new, beautiful masterpieces. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {makerProducts.map((product) => {
                                const cartItem = cart.find(item => item.id === product.id);
                                const remainingStock = (product.stock || 0) - (cartItem ? cartItem.quantity : 0);
                                return (
                                    <div
                                        key={product.id}
                                        className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                                    >
                                    {/* Image Container */}
                                    <div className="h-60 bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden group-hover:bg-gray-100 transition-colors">
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300" />
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 z-0 drop-shadow-md"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="font-bold text-gray-800 text-xl mb-1 group-hover:text-red-500 transition-colors line-clamp-2 leading-tight">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.307-.066l.003-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                                            </svg>
                                            {maker.location}
                                        </div>
                                        <p className={`text-sm text-gray-500 mb-2 leading-relaxed ${expandedProducts[product.id] ? '' : 'line-clamp-2'}`}>
                                            {product.desc}
                                        </p>
                                        {product.desc && product.desc.length > 60 && (
                                            <button 
                                                onClick={() => toggleDescription(product.id)}
                                                className="text-xs font-bold text-orange-500 hover:text-orange-600 mb-4 text-left transition-colors"
                                            >
                                                {expandedProducts[product.id] ? "Show Less ↑" : "Read More ↓"}
                                            </button>
                                        )}

                                        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-4">
                                            <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                                NPR {Number(product.price || 0).toLocaleString()}
                                            </p>
                                            <p className={`text-xs font-medium ${remainingStock <= 0 ? 'text-red-500' : 'text-gray-400'}`}>
                                                {remainingStock <= 0 ? "Out of Stock" : `Stock: ${remainingStock}`}
                                            </p>
                                            <button
                                                onClick={() => remainingStock > 0 && handleAddToCart(product)}
                                                disabled={remainingStock <= 0}
                                                className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg flex justify-center items-center gap-2 ${remainingStock <= 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:shadow-orange-500/30'}`}
                                            >
                                                <span>{remainingStock <= 0 ? "Out of Stock" : "Add to Cart"}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default page;
