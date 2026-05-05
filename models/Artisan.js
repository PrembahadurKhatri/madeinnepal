import mongoose from "mongoose";

const ArtisanSchema = new mongoose.Schema({
    name: String,
    email: String,
    location: String,
    province: String,
    description: String,
    image: String,
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "deactivated"],
        default: "pending"
    },
      revenue: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.models.Artisan || mongoose.model("Artisan", ArtisanSchema);