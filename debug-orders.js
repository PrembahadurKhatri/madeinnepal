import { connectDB } from "./lib/mongodb.js";
import Checkout from "./models/Checkout.js";

async function debug() {
  await connectDB();
  const orders = await Checkout.find().sort({ createdAt: -1 }).limit(5).lean();
  console.log(JSON.stringify(orders, null, 2));
  process.exit(0);
}

debug();
