"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const Page = () => {
  const [loading, setLoading] = useState(true);

  // skeleton loader simulation
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 px-6 py-20 overflow-hidden">

        {/* Background Blobs */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        {/* TITLE */}
        <div className="text-center mb-16">
          {loading ? (
            <div className="h-14 md:h-20 w-2/3 mx-auto bg-gray-200 rounded-xl animate-pulse" />
          ) : (
            <h1 className="text-5xl md:text-7xl font-extrabold">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                🇳🇵 MadeInNepal Story
              </span>
            </h1>
          )}
        </div>

        {/* CARD */}
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-2xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/40 flex flex-col md:flex-row gap-12 items-center">

          {/* IMAGE SECTION */}
          <div className="w-full md:w-1/2">
            {loading ? (
              <div className="w-full h-96 bg-gray-200 rounded-3xl animate-pulse" />
            ) : (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition"></div>

                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="/mero.jpg"
                    alt="Founder"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>

                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-xl font-bold">Founder</h2>
                    <p className="text-sm opacity-80">MadeInNepal</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STORY SECTION */}
          <div className="w-full md:w-1/2 space-y-6">

            {loading ? (
              <>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>

                <div className="h-20 bg-gray-200 rounded-xl animate-pulse"></div>

                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>

                <div className="h-12 w-40 bg-gray-200 rounded-full animate-pulse mt-6"></div>
              </>
            ) : (
              <div className="text-gray-700 space-y-6 text-lg leading-relaxed">

                <p>
                  In the heart of a classroom at{" "}
                  <b className="text-orange-600">Soch College of IT</b>, during a quiet morning break in the fifth semester,
                  a simple thought began to grow —
                  <span className="italic text-gray-900 font-medium">
                    {" "}what if Nepal could wear its own identity with pride?
                  </span>
                </p>

                <p>
                  My name is <b className="text-gray-900">Prem Bahadur Khatri</b>, and I saw something deeper in Nepal —
                  not just mountains and temples, but the hands of creators, artisans, and dreamers.
                </p>

                <p>
                  Many of their creations remained unseen, overshadowed by imported goods.
                  That moment gave birth to <b className="text-orange-600">MadeInNepal</b>.
                </p>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-5 rounded-xl">
                  <p className="italic text-gray-800">
                    A platform where every product carries a story.<br />
                    A space where every purchase supports a dream.<br />
                    A movement to uplift local craftsmanship.
                  </p>
                </div>

                <p>
                  MadeInNepal is not just a website — it is a bridge between culture, creativity, and opportunity.
                </p>

                <p className="text-xl font-semibold text-gray-900">
                  Because when you choose MadeInNepal,<br />
                  you are not just buying a product…<br />
                  you are carrying a piece of Nepal with you. ❤️
                </p>

                <div className="pt-4">
                  <Link href="/market">
                    <button className="px-7 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:scale-105 transition">
                      Explore Products →
                    </button>
                  </Link>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* FOOTER QUOTE */}
        <div className="text-center mt-20 text-gray-500 italic text-lg">
          {loading ? (
            <div className="h-4 w-1/3 mx-auto bg-gray-200 rounded animate-pulse"></div>
          ) : (
            `"Support Local. Empower Dreams. 🇳🇵"`
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;