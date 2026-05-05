"use client"
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
const page = () => {
  const [form,setForm] = useState({
    name:"",
    email:"",
    message:""
  })
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState("");
  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {      const res = await fetch("/api/contact",{
        method:"POST",
        headers:{ 
          "Content-Type":"application/json"
        },
        body: JSON.stringify(form)
      })
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Invalid response:", text);
        return setSuccess("Server error, received HTML instead of JSON");
      }
      if(data.success){
        setSuccess("Message sent successfully!");
        setForm({name:"",email:"",message:""})
      } else {
        setSuccess("Failed to send message. Please try again.");
      } 
    } catch (error) {
      setSuccess("An error occurred. Please try again.");
    }
    setLoading(false);
  }
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      <Navbar />

      {/* Main Section */}
      <div className="flex items-center justify-center py-16 px-4">
        <div className="grid md:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full border border-white/20">

          {/* LEFT SIDE IMAGE */}
          <div className="relative hidden md:block">
            <img
              src="contact.avif"
              alt="contact"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-6">
              <h1 className="text-4xl font-bold mb-4">Let’s Talk 💬</h1>
              <p className="text-gray-300">
                We are always here to help you anytime.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="p-8 md:p-10">

            <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
              Contact Us
            </h2>

            <p className="text-gray-300 mb-8 text-center md:text-left">
              Have questions or need help? Send us a message and we’ll get back to you quickly 🚀
            </p>

            {/* CONTACT FORM */}
            <form className="space-y-5" onSubmit={handleSubmit}>

              <input
                type="text"
                value={form.name}
                onChange={handleChange}
                name="name"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="email"
                value={form.email}
                onChange={handleChange}
                name="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <textarea
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                name="message"
                rows="4"
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg font-semibold transition duration-300 hover:scale-105 shadow-lg"
              >
               {loading ? "Sending..." : "🚀 Send Message"}
              </button>
            
            </form>
             {/* Success Message */}
          {success && (
            <p className="mt-4 text-center">{success}</p>
          )}

            {/* CONTACT INFO */}
            <div className="mt-10 space-y-4 text-gray-300 text-sm">

              <p>📧 <span className="font-semibold ">Email: </span> <a className='text-red-500 hover:text-red-700 ' href="mailto:sahilkhatrii750@gmail.com">sahilkhatrii750@gmail.com</a></p>
              <p>📱 <span className="font-semibold">Phone: </span><a className='text-red-500 hover:text-red-700' href="tel:+9779827169125">9827169125</a></p>
              <p>📍 <span className="font-semibold">Address:</span> Pokhara, Nepal</p>

            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default page