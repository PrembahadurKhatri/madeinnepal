import mongoose from "mongoose";

const ShippingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Shipping ||
  mongoose.model("Shipping", ShippingSchema);