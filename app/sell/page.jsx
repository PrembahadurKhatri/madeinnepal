"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SellPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async () => {
    if (!username || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
        if (data.artisanId) localStorage.setItem("artisanId", data.artisanId);

        if (data.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/sell/dashboard");
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Magical Multi-layer Gradient Background */}
      <div className="fixed inset-0 z-[-2]">
        {/* Layer 1 - Main Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient-flow" />
        
        {/* Layer 2 - Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        
        {/* Layer 3 - Floating Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-60 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-medium" />
          <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/30 to-indigo-400/30 rounded-full blur-3xl animate-float-fast" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-slow delay-2000" />
        </div>

        {/* Layer 4 - Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(180deg); }
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-move 20s linear infinite;
        }
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        .animate-gradient-flow { animation: gradient-flow 20s ease infinite; }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 8s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 10s ease-in-out infinite; }
        .card-glow {
          box-shadow: 
            0 0 60px rgba(168, 85, 247, 0.4),
            0 0 100px rgba(236, 72, 153, 0.3),
            0 0 20px rgba(99, 102, 241, 0.5),
            inset 0 0 40px rgba(255, 255, 255, 0.1);
        }
        .btn-glow {
          box-shadow: 
            0 0 30px rgba(168, 85, 247, 0.6),
            0 0 60px rgba(236, 72, 153, 0.4),
            inset 0 0 20px rgba(255, 255, 255, 0.2);
        }
        .btn-glow:hover {
          box-shadow: 
            0 0 50px rgba(168, 85, 247, 0.8),
            0 0 100px rgba(236, 72, 153, 0.6),
            inset 0 0 30px rgba(255, 255, 255, 0.3);
        }
        @media (prefers-reduced-motion: reduce) {
          *, .animate-* { animation: none !important; }
        }
      `}</style>

      <Navbar />
      
      <div className="min-h-screen flex items-center justify-center p-6 pt-24 pb-24">
        <div className="w-full max-w-lg">
          {/* Ultimate Glass Card */}
          <div className="relative bg-white/5 backdrop-blur-3xl border border-white/20 rounded-4xl p-12 card-glow hover:scale-[1.02] transition-all duration-1000 group/card">
            
            {/* Animated Logo */}
            <div className="text-center mb-12">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 group-hover:scale-110 transition-all duration-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                <svg className="w-20 h-20 text-white relative z-10 drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-4 drop-shadow-2xl animate-pulse">
                Dashboard
              </h1>
              <p className="text-white/90 text-xl md:text-2xl font-semibold tracking-wide drop-shadow-lg">
                Secure Login Portal
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-500/40 text-red-100 p-6 rounded-3xl mb-10 backdrop-blur-xl shadow-2xl animate-bounce">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-ping" />
                  <p className="font-bold text-xl">{error}</p>
                </div>
              </div>
            )}

            {/* Premium Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-white/95 font-bold text-2xl mb-6 tracking-wide">👤 Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full h-20 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl px-8 py-6 text-2xl text-white placeholder-white/50 focus:outline-none focus:ring-8 focus:ring-purple-500/50 focus:border-white/60 transition-all duration-700 hover:border-white/50 hover:shadow-glow shadow-xl"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-white/95 font-bold text-2xl mb-6 tracking-wide">📧 Email</label>
                <input
                  type="email"
                  placeholder="your.email@company.com"
                  className="w-full h-20 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl px-8 py-6 text-2xl text-white placeholder-white/50 focus:outline-none focus:ring-8 focus:ring-purple-500/50 focus:border-white/60 transition-all duration-700 hover:border-white/50 hover:shadow-glow shadow-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-white/95 font-bold text-2xl mb-6 tracking-wide">🔒 Password</label>
                <input
                  type="password"
                  placeholder="Enter your secure password"
                  className="w-full h-20 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl px-8 py-6 text-2xl text-white placeholder-white/50 focus:outline-none focus:ring-8 focus:ring-purple-500/50 focus:border-white/60 transition-all duration-700 hover:border-white/50 hover:shadow-glow shadow-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-20 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:from-purple-700 hover:via-pink-600 hover:to-indigo-700 text-white font-black text-2xl rounded-3xl shadow-2xl btn-glow transform hover:-translate-y-3 transition-all duration-700 flex items-center justify-center space-x-4 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/50 to-white/30 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {loading ? (
                  <>
                    <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>🚀 Access Dashboard</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer Text */}
            <div className="text-center mt-16 pt-10 border-t-2 border-white/20">
              <div className="flex justify-center space-x-8 text-white/60 text-lg">
                <span>🔒 Secure</span>
                <span>⚡ Fast</span>
                <span>🌟 Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}