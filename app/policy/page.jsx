import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PolicySection = ({ title, children, icon }) => (
  <section className="mb-12 group">
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 transition-transform group-hover:scale-110 duration-300 ring-4 ring-blue-50/50">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{title}</h2>
    </div>
    <div className="pl-0 sm:pl-15 text-gray-600 leading-relaxed space-y-4">
      {children}
    </div>
  </section>
)

const Page = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-blue-200">
      <Navbar />
      
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white py-24 sm:py-32">
        {/* Abstract Background Patterns */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] aspect-square bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50"></div>
        
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-semibold tracking-wide uppercase shadow-sm backdrop-blur-md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Legal Information
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-200 drop-shadow-sm">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl leading-8 text-blue-100/90 max-w-2xl mx-auto font-medium">
            Your privacy is our priority. Discover how we protect, manage, and respect your data while you explore authentic Made in Nepal products.
          </p>
          <div className="mt-10 text-sm text-blue-200/90 bg-white/5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-xl">
            <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last Updated: <span className="font-semibold text-white">April 4, 2026</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 -mt-20 sm:-mt-24 relative z-20 mb-20">
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 ring-1 ring-gray-900/5 p-6 sm:p-10 md:p-16">
          
          <PolicySection 
            title="1. Information We Collect" 
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          >
            <p className="text-lg">We collect the necessary information to provide a seamless shopping experience. The specific types of data we gather include:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group/card">
                <h3 className="font-bold text-gray-900 flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover/card:bg-blue-600 group-hover/card:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  Personal Details
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start gap-2"><svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Full Name & Email</li>
                  <li className="flex items-start gap-2"><svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Phone Number</li>
                  <li className="flex items-start gap-2"><svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Delivery Address</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group/card">
                <h3 className="font-bold text-gray-900 flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover/card:bg-indigo-600 group-hover/card:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  Account & Billing
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Login credentials</li>
                  <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Order history</li>
                  <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Payment tokens (Encrypted)</li>
                </ul>
              </div>
            </div>
          </PolicySection>

          <PolicySection 
            title="2. How We Use Your Information" 
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
          >
            <p className="border-l-4 border-blue-500 pl-4 text-gray-700 italic text-lg mb-6 bg-blue-50/50 py-2 rounded-r-lg">
              We primarily use your data to connect you with authentic Nepali creators and ensure your orders reach you safely.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                { title: "Order Fulfillment", desc: "Processing and delivering your orders from creators.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
                { title: "Communication", desc: "Sending tracking info and rapid support responses.", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
                { title: "Platform Improvement", desc: "Enhancing performance and product recommendations.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                { title: "Personalization", desc: "Curating a tailored browsing adventure for you.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5">{item.title}</strong>
                    <span className="text-sm text-gray-500">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </PolicySection>

          <PolicySection 
            title="3. Information Sharing" 
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>}
          >
            <p className="text-lg"><strong>We absolutely do not sell your personal data.</strong> Your trust is paramount. We only share necessary minimum details with highly vetted partners essential for operations:</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-medium w-full sm:w-auto">
                <span className="text-xl">📦</span> Logistics & Delivery
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 font-medium w-full sm:w-auto">
                <span className="text-xl">💳</span> Payment Providers
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium w-full sm:w-auto">
                <span className="text-xl">✨</span> Local Artisans
              </div>
            </div>
          </PolicySection>

          <PolicySection 
            title="4. Data Security & Tracking" 
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          >
            <p className="text-lg mb-4">Your connection to Made in Nepal is safeguarded using advanced <strong className="text-gray-900">256-bit SSL encryption</strong>. We employ modern safeguards to shield your information from unauthorized access, alteration, or destruction.</p>
            <p>We use functional cookies to elevate your browsing experience, remember your preferences, and maintain robust session security. You maintain full control and can manage or disable cookie preferences directly from your device browser settings.</p>
          </PolicySection>
          
          <PolicySection 
            title="5. Your Privacy Rights" 
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
          >
            <p className="text-lg">You remain in command of your digital footprint. You inherently possess the right to:</p>
            <ul className="text-gray-700 space-y-3 mt-4 ml-4">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> <strong>Access</strong> any personal data we hold about you.</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> <strong>Update</strong> or correct inaccuracies in your information.</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Request total <strong>Deletion</strong> of your account and data.</li>
            </ul>
          </PolicySection>

          <hr className="my-12 border-gray-100/80" />

          {/* Contact Block */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Have questions about our policy?</h3>
              <p className="text-blue-200/90 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                Our dedicated support team is actively available to help you understand precisely how your data is handled and protected.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a href="mailto: sahilkhatrii750@gmail.com" className="inline-flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-blue-900 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/10 active:scale-95 duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 sahilkhatrii750@gmail.com
                </a>
                <span className="text-blue-300/50 font-medium">or</span>
                <div className="flex items-center gap-2 text-white font-medium bg-white/10 px-6 py-4 rounded-xl backdrop-blur-sm border border-white/5">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Pokhara, Nepal
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Page
