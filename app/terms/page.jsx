"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Section = ({ title, children, icon }) => (
  <section className="mb-12 group relative">
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-orange-400 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">{title}</h2>
    </div>
    <div className="pl-0 sm:pl-4 text-gray-700 leading-relaxed space-y-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      {children}
    </div>
  </section>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-red-200">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-orange-500 text-white py-32 text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-10 pointer-events-none"></div>
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">Terms of Service</h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto font-medium drop-shadow-sm">
          By using Made in Nepal, you agree to our terms. Please read carefully.
        </p>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <Section
          title="1. Acceptance of Terms"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
            </svg>
          }
        >
          <p>
            By accessing or using Made in Nepal, you agree to be bound by these Terms of Service, our Privacy Policy, and all applicable laws.
          </p>
          <p className="border-l-4 border-red-400 pl-4 italic bg-red-50/40 py-2 rounded-r-lg">
            If you do not agree, please do not use our platform.
          </p>
        </Section>

        <Section
          title="2. User Responsibilities"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422M12 14L5.84 10.578M12 14v7" />
            </svg>
          }
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg shadow-sm hover:shadow-md transition">
              Provide accurate info during registration & purchase.
            </li>
            <li className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-lg shadow-sm hover:shadow-md transition">
              Keep your account credentials confidential.
            </li>
            <li className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg shadow-sm hover:shadow-md transition">
              Use the platform lawfully and responsibly.
            </li>
            <li className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-lg shadow-sm hover:shadow-md transition">
              Respect intellectual property of Made in Nepal and sellers.
            </li>
          </ul>
        </Section>

        <Section
          title="3. Payments & Orders"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-4.418 0-8 1.79-8 4s3.582 4 8 4 8-1.79 8-4-3.582-4-8-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v8m0-8l-3 3m3-3l3 3" />
            </svg>
          }
        >
          <p>
            All payments must comply with accepted payment methods. Orders are subject to product availability and confirmation.
          </p>
        </Section>

        <Section
          title="4. Intellectual Property"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          <p>
            All content on Made in Nepal, including logos, images, text, and software, is protected by copyright and intellectual property laws.
          </p>
        </Section>

        <Section
          title="5. Limitation of Liability"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          <p>
            Made in Nepal is not liable for direct, indirect, or incidental damages from your use of the platform or products purchased.
          </p>
        </Section>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-br from-red-600 to-orange-500 text-white p-12 rounded-3xl text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <h3 className="text-3xl font-bold mb-4">Questions About Terms?</h3>
          <p className="mb-6 max-w-xl mx-auto text-lg">
            Reach out to our support team if you have questions about these Terms of Service.
          </p>
          <a
            href="mailto:support@madeinnepal.com"
            className="inline-block bg-white text-red-600 font-bold px-8 py-3 rounded-full hover:bg-white/90 transition shadow-lg"
          >
            support@madeinnepal.com
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}