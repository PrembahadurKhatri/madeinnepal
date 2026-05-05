import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  artisanId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: String,

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    default: 0,
  },

  image: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  // 🔥 Pending update structure (IMPORTANT IMPROVEMENT)
  pendingUpdate: {
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    image: String,
  },

}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);