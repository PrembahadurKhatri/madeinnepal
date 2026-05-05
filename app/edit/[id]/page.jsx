"use client"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect,useState } from "react"
import { useParams,useRouter } from "next/navigation"
export default function EditPage() {
    const { id } = useParams();
    const router = useRouter();
    const [form,setForm] = useState({
        name:"",
        price:"",
        stock:"",
        image:"",
        description:""
    })
    useEffect(() => {
        fetch(`/api/product/${id}`)
        .then(res => res.json())
        .then(data => setForm(data));
    },[id]);

    const handleupdate = async (e) => {
        e.preventDefault();
        await fetch(`/api/product/update/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(form),
        });
        router.push("/sell");//back to dashboard
    };
       return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
    <Navbar />

    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-xl border border-gray-100 p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-500 mt-1">Update your product details بسهولة</p>
        </div>

        {/* Form */}
        <form onSubmit={handleupdate} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-gray-700">Price (Rs.)</label>
            <input
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              placeholder="Paste image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image Preview */}
          {form.image && (
            <div className="mt-3">
              <img
                src={form.image}
                alt="preview"
                className="h-40 w-full object-cover rounded-xl border"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Write product details..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-indigo-600 text-white py-3 font-semibold hover:bg-indigo-700 transition active:scale-[0.98]"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={() => router.push("/sell")}
              className="flex-1 rounded-xl bg-gray-200 text-gray-800 py-3 font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>

    <Footer />
  </div>
);
}