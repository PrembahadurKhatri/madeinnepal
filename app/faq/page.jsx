"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

const faqCategories = [
  {
    category: "🛍️ General Questions",
    items: [
      { q: "What is Made in Nepal?", a: "Made in Nepal is an online platform that showcases and sells authentic Nepali products crafted by local artisans from all seven provinces. Our goal is to promote local craftsmanship and support Nepali businesses." },
      { q: "What kind of products do you offer?", a: "We offer a curated selection of handmade and locally produced goods such as handicrafts, clothing, accessories, home décor, organic products, and more." },
      { q: "Are all products really made in Nepal?", a: "Yes, we ensure that all products listed on our platform are either handmade or produced within Nepal by verified artisans and sellers." }
    ]
  },
  {
    category: "🚚 Orders & Delivery",
    items: [
      { q: "How can I place an order?", a: "Simply browse products, add items to your cart, and proceed to checkout. Follow the steps to complete your order." },
      { q: "Do you deliver all over Nepal?", a: "Yes, we provide delivery services across Nepal. Delivery time may vary depending on your location." },
      { q: "How long does delivery take?", a: "Delivery usually takes 2–7 business days depending on the product and delivery area." },
      { q: "Can I track my order?", a: "Yes, once your order is confirmed, you will receive tracking details via email or SMS." }
    ]
  },
  {
    category: "💳 Payments",
    items: [
      { q: "What payment methods do you accept?", a: "We accept Cash on Delivery (COD), eSewa, Khalti, and other digital payment options." },
      { q: "Is Cash on Delivery available?", a: "Yes, COD is available in most locations across Nepal." }
    ]
  },
  {
    category: "🔄 Returns & Refunds",
    items: [
      { q: "Can I return a product?", a: "Yes, you can request a return within 3–5 days of delivery if the product is damaged or not as described." },
      { q: "How do I request a refund?", a: "Contact our support team with your order details, and we will guide you through the process." }
    ]
  },
  {
    category: "🧑‍🎨 Sellers & Artisans",
    items: [
      { q: "Can I sell my products on Made in Nepal?", a: "Yes! We welcome local artisans and sellers to join our platform." },
      { q: "How do I become a seller?", a: "You can register through our Seller Panel by providing your business details and product information." },
      { q: "Is there any fee for sellers?", a: "We may charge a small commission per sale. Details will be provided during registration." }
    ]
  },
  {
    category: "🔐 Account & Security",
    items: [
      { q: "Do I need an account to place an order?", a: "No, but creating an account helps you track orders and manage your purchases easily." },
      { q: "Is my personal information सुरक्षित (safe)?", a: "Yes, we prioritize your privacy and use secure systems to protect your data." }
    ]
  },
  {
    category: "📞 Support & Mission",
    items: [
      { q: "How can I contact customer support?", a: "You can reach us via email, phone, or through the contact form on our website." },
      { q: "What is your mission?", a: "We aim to promote Nepali craftsmanship globally and empower local communities by connecting them directly with customers." }
    ]
  }
];

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
      >
        <h3 className={`font-semibold text-lg transition-colors ${isOpen ? 'text-red-600' : 'text-gray-900'}`}>
          {question}
        </h3>
        <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-red-50 text-red-500 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed font-light">{answer}</p>
      </div>
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* FAQ Hero Section */}
      <div className="pt-32 pb-16 px-6 bg-gradient-to-br from-red-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 left-10 w-40 h-40 bg-orange-400/20 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-serif tracking-tight drop-shadow-md">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 font-light max-w-2xl mx-auto drop-shadow">
            Got questions? We've got answers. Find everything you need to know about shopping, selling, and supporting Made in Nepal.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 w-full -mt-10 relative z-20">
        <div className="space-y-12">
          {faqCategories.map((group, index) => (
            <div key={index} className="bg-white/50 p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 font-serif border-b border-gray-100 pb-4">
                {group.category}
              </h2>
              <div className="space-y-2">
                {group.items.map((item, itemIdx) => (
                  <FAQAccordion key={itemIdx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
           <h3 className="text-2xl font-bold text-gray-900 font-serif mb-3 relative z-10">Still have questions?</h3>
           <p className="text-gray-500 mb-8 max-w-md mx-auto font-light relative z-10">
             If you couldn't find the answer to your question, our support team is ready to help you out.
           </p>
           <button className="bg-gray-900 hover:bg-black text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 relative z-10">
            <a href="mailto:sahilkhatrii750@gmail.com">Contact Support</a> 
           </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
