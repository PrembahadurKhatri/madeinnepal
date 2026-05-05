const mongoose = require('mongoose');

async function check() {
  await mongoose.connect('mongodb+srv://khatrisahill11:xK13nC3sLq02uP5b@cluster0.rtntw.mongodb.net/madeinnepal');
  const Artisan = mongoose.model('Artisan', new mongoose.Schema({}, { strict: false }));
  const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

  const artisans = await Artisan.find().lean();
  console.log("Artisans:", JSON.stringify(artisans, null, 2));

  const products = await Product.find().lean();
  console.log("Products:", JSON.stringify(products, null, 2));

  process.exit(0);
}
check();
