import mongoose from "mongoose";

const CheckoutSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {                // ✅ ADD
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    location: {            // ✅ ADD
      type: String,
      required: true,
    },

    province: {            // ✅ ADD
      type: String,
      required: true,
    },

    items: {
      type: Array,
      required: true,
      default: [],
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"], // ✅ better system
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Checkout ||
  mongoose.model("Checkout", CheckoutSchema);