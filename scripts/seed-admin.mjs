// scripts/seed-admin.mjs
// Run this ONCE to create admin user:
// node scripts/seed-admin.mjs

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// Load .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) process.env[key.trim()] = vals.join("=").trim();
  });
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

// ─── CHANGE THESE ────────────────────────────────────────────
const ADMIN_USERNAME = "admin";
const ADMIN_EMAIL = "admin@madeinnepal.com";
const ADMIN_PASSWORD = "Admin@123";
// ─────────────────────────────────────────────────────────────

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["artisan", "admin"], default: "artisan" },
    artisanId: { type: mongoose.Schema.Types.ObjectId, ref: "Artisan" },
  },
  { timestamps: true }
);

async function seed() {
  await mongoose.connect(MONGODB_URI, { dbName: "madeinnepal" });
  console.log("✅ Connected to MongoDB");

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  // Check if admin already exists
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log("⚠️  Admin user already exists:", existing.email);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await User.create({
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: hashedPassword,
    role: "admin",
  });

  console.log("🎉 Admin user created successfully!");
  console.log("   Username:", ADMIN_USERNAME);
  console.log("   Email:   ", ADMIN_EMAIL);
  console.log("   Password:", ADMIN_PASSWORD);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
